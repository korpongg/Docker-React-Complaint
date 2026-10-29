
const { sequelize } = require("../config/dbConn");
const { QueryTypes } = require("sequelize");

const DB_NAME = process.env.DB_NAME;

const FACTION_OPTIONS = [
  { id: 0, name: "แพทย์" },
  { id: 1, name: "ฝ่ายแพทย์" },
  { id: 2, name: "งานพยาบาล" },
  { id: 3, name: "ฝ่ายบริหาร" },
  { id: 4, name: "ฝ่ายปฏิบัติการ" },
];

const toNumber = (value) => {
  if (value === null || value === undefined) return 0;

  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const getRiskDashboard = async (req, res) => {
  try {
    // ==================================================
    // 1. ตรวจสอบฐานข้อมูล
    // ==================================================
    if (!DB_NAME || !/^[a-zA-Z0-9_]+$/.test(DB_NAME)) {
      throw new Error("DB_NAME ไม่ถูกต้องหรือไม่ได้ตั้งค่า");
    }

    const db = `[${DB_NAME}]`;

    // ==================================================
    // 2. อ่านตัวกรอง
    // ==================================================
    const parsedMonths = Number.parseInt(req.query.months, 10);

    const months = [3, 6, 9, 12].includes(parsedMonths)
      ? parsedMonths
      : 12;

    const factionId =
      req.query.factionId !== undefined &&
      req.query.factionId !== ""
        ? Number(req.query.factionId)
        : null;

    const departmentId =
      req.query.departmentId !== undefined &&
      req.query.departmentId !== ""
        ? Number(req.query.departmentId)
        : null;

    if (
      factionId !== null &&
      (
        !Number.isInteger(factionId) ||
        !FACTION_OPTIONS.some((item) => item.id === factionId)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "สังกัดไม่ถูกต้อง",
      });
    }

    if (
      departmentId !== null &&
      (
        !Number.isSafeInteger(departmentId) ||
        departmentId <= 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "รหัสแผนกไม่ถูกต้อง",
      });
    }

    // ==================================================
    // 3. Replacements ใช้ร่วมกัน
    // ==================================================
    const filterReplacements = {};

    if (factionId !== null) {
      filterReplacements.factionId = factionId;
    }

    if (departmentId !== null) {
      filterReplacements.departmentId = departmentId;
    }

    const commonReplacements = {
      ...filterReplacements,
      months,
    };

    // ==================================================
    // 4. ตัวกรองสังกัด / แผนก
    // ใช้ person_complaint เฉพาะตอนเลือกตัวกรอง
    // ==================================================
    let personFilter = "";

    if (factionId !== null) {
      personFilter += `
        AND TRY_CONVERT(INT, pc.faction) = :factionId
      `;
    }

    if (departmentId !== null) {
      personFilter += `
        AND TRY_CONVERT(INT, pc.department) = :departmentId
      `;
    }

    const hasPersonFilter =
      factionId !== null || departmentId !== null;

    const personFilterCondition = hasPersonFilter
      ? `
        AND EXISTS (
          SELECT 1
          FROM ${db}.dbo.person_complaint AS pc
          WHERE pc.reportid = c.reportid
          ${personFilter}
        )
      `
      : "";

    // ใช้ Complaints เป็นตารางหลักทุก Query
    const baseWhere = `
      ISNULL(CONVERT(VARCHAR(20), c.formstatus), '') <> '3'
      ${personFilterCondition}
    `;

    // ==================================================
    // 5. ตัวกรองวันที่รายเดือน
    // ฐาน Complaint ใช้คอลัมน์ [date]
    // ==================================================
    const dateFilter = `
      c.[date] >= DATEADD(
        MONTH,
        1 - :months,
        DATEFROMPARTS(
          YEAR(GETDATE()),
          MONTH(GETDATE()),
          1
        )
      )
      AND c.[date] < DATEADD(
        MONTH,
        1,
        DATEFROMPARTS(
          YEAR(GETDATE()),
          MONTH(GETDATE()),
          1
        )
      )
    `;

    // ==================================================
    // 6. KPI / OVERVIEW
    //
    // ไม่ใช่ข้อร้องเรียน: status = 0
    // สถานะอื่น: ใช้ risk เป็นตัวแบ่งกลุ่ม
    // ไม่เอารายการ status = 0 ไปนับซ้ำในกลุ่ม risk
    // ==================================================
const overviewRows = await sequelize.query(
  `
    SELECT
      COUNT(*) AS total,

      -- ไม่ใช่ข้อร้องเรียน: ต้องตรวจ status ก่อน risk
      SUM(
        CASE
          WHEN CONVERT(VARCHAR(20), c.status) = '0'
          THEN 1 ELSE 0
        END
      ) AS notComplaint,

      -- ข้อร้องเรียนใหม่: fallback ไป riskStatuses.null
      SUM(
        CASE
          WHEN ISNULL(CONVERT(VARCHAR(20), c.status), '') <> '0'
            AND (
              c.risk IS NULL
              OR TRY_CONVERT(INT, c.risk) NOT IN (1, 2, 3, 4)
            )
          THEN 1 ELSE 0
        END
      ) AS pending,

      -- รอรับเรื่อง / รอดำเนินการ
      SUM(
        CASE
          WHEN ISNULL(CONVERT(VARCHAR(20), c.status), '') <> '0'
            AND TRY_CONVERT(INT, c.risk) = 1
          THEN 1 ELSE 0
        END
      ) AS waitingResponse,

      -- ตอบกลับแล้ว
      SUM(
        CASE
          WHEN ISNULL(CONVERT(VARCHAR(20), c.status), '') <> '0'
            AND TRY_CONVERT(INT, c.risk) = 2
          THEN 1 ELSE 0
        END
      ) AS responded,

      -- วิเคราะห์แล้ว
      SUM(
        CASE
          WHEN ISNULL(CONVERT(VARCHAR(20), c.status), '') <> '0'
            AND TRY_CONVERT(INT, c.risk) = 3
          THEN 1 ELSE 0
        END
      ) AS analyzed,

      -- เสร็จสิ้น
      SUM(
        CASE
          WHEN ISNULL(CONVERT(VARCHAR(20), c.status), '') <> '0'
            AND TRY_CONVERT(INT, c.risk) = 4
          THEN 1 ELSE 0
        END
      ) AS completed

    FROM [${DB_NAME}].dbo.Complaints c
    WHERE
      ISNULL(CONVERT(VARCHAR(20), c.formstatus), '') <> '3'
      ${personFilterCondition}
  `,
  {
    replacements: filterReplacements,
    type: QueryTypes.SELECT,
  }
);
    const overviewRow = overviewRows[0] || {};

    const overview = {
      total: toNumber(overviewRow.total),
      notComplaint: toNumber(overviewRow.notComplaint),
      pending: toNumber(overviewRow.pending),
      waitingResponse: toNumber(overviewRow.waitingResponse),
      responded: toNumber(overviewRow.responded),
      analyzed: toNumber(overviewRow.analyzed),
      completed: toNumber(overviewRow.completed),
    };

    overview.processing =
      overview.pending +
      overview.waitingResponse +
      overview.responded +
      overview.analyzed;

    // ==================================================
    // 7. แนวโน้มรายเดือน
    // ใช้ c.[date] ทุกตำแหน่ง
    // ==================================================
    const monthlyRows = await sequelize.query(
      `
        SELECT
          DATEFROMPARTS(
            YEAR(c.[date]),
            MONTH(c.[date]),
            1
          ) AS monthDate,

          COUNT_BIG(*) AS total

        FROM ${db}.dbo.Complaints AS c

        WHERE ${baseWhere}
          AND ${dateFilter}

        GROUP BY
          YEAR(c.[date]),
          MONTH(c.[date])

        ORDER BY
          YEAR(c.[date]),
          MONTH(c.[date])
      `,
      {
        replacements: commonReplacements,
        type: QueryTypes.SELECT,
      }
    );

    const monthlyMap = new Map(
      monthlyRows.map((row) => {
        const date = new Date(row.monthDate);

        const key = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
        ].join("-");

        return [key, toNumber(row.total)];
      })
    );

    const monthlyTrend = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i -= 1) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const key = `${year}-${month}`;

      monthlyTrend.push({
        month: key,
        label: date.toLocaleDateString("th-TH", {
          month: "short",
          year: "2-digit",
        }),
        total: monthlyMap.get(key) || 0,
      });
    }

    // ==================================================
    // 8. สรุปสถานะ
    // ==================================================
    const statusBreakdown = [
      {
        key: "pending",
        label: "ข้อร้องเรียนใหม่",
        count: overview.pending,
      },
      {
        key: "waitingResponse",
        label: "รอตอบกลับ",
        count: overview.waitingResponse,
      },
      {
        key: "responded",
        label: "ตอบกลับแล้ว",
        count: overview.responded,
      },
      {
        key: "analyzed",
        label: "วิเคราะห์แล้ว",
        count: overview.analyzed,
      },
      {
        key: "completed",
        label: "เสร็จสิ้น",
        count: overview.completed,
      },
      {
        key: "notComplaint",
        label: "ไม่ใช่ข้อร้องเรียน",
        count: overview.notComplaint,
      },
    ];

    // ==================================================
    // 9. ประเภทข้อมูล
    // ==================================================
    const severityBreakdown = await sequelize.query(
      `
        SELECT
          ISNULL(
            NULLIF(LTRIM(RTRIM(c.suggestion)), ''),
            N'ไม่ระบุ'
          ) AS label,

          COUNT_BIG(*) AS count

        FROM ${db}.dbo.Complaints AS c

        WHERE ${baseWhere}

        GROUP BY
          ISNULL(
            NULLIF(LTRIM(RTRIM(c.suggestion)), ''),
            N'ไม่ระบุ'
          )

        ORDER BY COUNT_BIG(*) DESC
      `,
      {
        replacements: filterReplacements,
        type: QueryTypes.SELECT,
      }
    );


       // ==================================================
    // 9. ประเภทข้อมูล
    // ==================================================
    const generalRiskBreakdown = await sequelize.query(
      `
        SELECT
          ISNULL(
            NULLIF(LTRIM(RTRIM(c.generalRiskLevel)), ''),
            N'ไม่ระบุ'
          ) AS label,

          COUNT_BIG(*) AS count

        FROM ${db}.dbo.Complaints AS c

        WHERE ${baseWhere}

        GROUP BY
          ISNULL(
            NULLIF(LTRIM(RTRIM(c.generalRiskLevel)), ''),
            N'ไม่ระบุ'
          )

        ORDER BY COUNT_BIG(*) DESC
      `,
      {
        replacements: filterReplacements,
        type: QueryTypes.SELECT,
      }
    );
    // ==================================================
    // 10. สรุปตามแผนกและสังกัด
    // Complaints เป็นตารางหลัก
    // person_complaint ใช้เฉพาะข้อมูลแผนก/สังกัด
    // ==================================================
    const departmentBreakdown = await sequelize.query(
      `
        SELECT TOP 10
          d.id AS departmentId,

          COALESCE(
            d.name,
            N'ไม่ระบุแผนก'
          ) AS department,

          TRY_CONVERT(INT, pc.faction) AS factionId,

          CASE TRY_CONVERT(INT, pc.faction)
            WHEN 0 THEN N'แพทย์'
            WHEN 1 THEN N'ฝ่ายแพทย์'
            WHEN 2 THEN N'งานพยาบาล'
            WHEN 3 THEN N'ฝ่ายบริหาร'
            WHEN 4 THEN N'ฝ่ายปฏิบัติการ'
            ELSE N'ไม่ระบุสังกัด'
          END AS faction,

          COUNT(DISTINCT c.reportid) AS count

        FROM ${db}.dbo.Complaints AS c

        INNER JOIN ${db}.dbo.person_complaint AS pc
          ON pc.reportid = c.reportid

        LEFT JOIN ${db}.dbo.department AS d
          ON d.id = TRY_CONVERT(INT, pc.department)

        WHERE ${baseWhere}

        GROUP BY
          d.id,
          d.name,
          TRY_CONVERT(INT, pc.faction)

        ORDER BY
          COUNT(DISTINCT c.reportid) DESC
      `,
      {
        replacements: filterReplacements,
        type: QueryTypes.SELECT,
      }
    );

    // ==================================================
    // 11. รายการติดตาม
    // Complaints เป็นแหล่งสถานะหลัก
    // RiskManagement ใช้เฉพาะวันครบกำหนดตอบกลับ
    // ==================================================
    const followUpRows = await sequelize.query(
      `
        SELECT TOP 20
          c.reportid,
          rm.responseDueDate AS dueDate,
          c.risk,
          c.status,

          CASE
            WHEN rm.responseDueDate < GETDATE()
            THEN 1
            ELSE 0
          END AS overdue,

          STUFF((
            SELECT
              N', ' + d2.name

            FROM OPENJSON(
              CASE
                WHEN ISJSON(c.deptrelate) = 1
                THEN c.deptrelate
                ELSE '[]'
              END
            ) AS depJson2

            INNER JOIN ${db}.dbo.department AS d2
              ON d2.id = TRY_CONVERT(INT, depJson2.value)

            FOR XML PATH(''), TYPE
          ).value('.', 'NVARCHAR(MAX)'), 1, 2, N'') AS department

        FROM ${db}.dbo.Complaints AS c

        INNER JOIN ${db}.dbo.RiskManagement AS rm
          ON rm.reportid = c.reportid

        WHERE ${baseWhere}

          AND (
            c.status IS NULL
            OR TRY_CONVERT(INT, c.status) <> 0
          )

          AND rm.responseDueDate IS NOT NULL

          AND (
            c.risk IS NULL
            OR TRY_CONVERT(INT, c.risk) IN (1, 2, 3)
          )

        ORDER BY
          CASE
            WHEN rm.responseDueDate < GETDATE()
            THEN 0
            ELSE 1
          END,
          rm.responseDueDate ASC
      `,
      {
        replacements: filterReplacements,
        type: QueryTypes.SELECT,
      }
    );

    const statusLabels = {
      null: "ข้อร้องเรียนใหม่",
      1: "รอตอบกลับ",
      2: "ตอบกลับแล้ว",
      3: "วิเคราะห์แล้ว",
      4: "เสร็จสิ้น",
    };

    const followUpItems = followUpRows.map((row) => ({
      reportid: row.reportid,
      dueDate: row.dueDate,
      overdue: Boolean(row.overdue),
      department: row.department || "ไม่ระบุแผนก",
      statusLabel:
        statusLabels[
          row.risk === null || row.risk === undefined
            ? "null"
            : String(row.risk)
        ] || "ไม่ระบุสถานะ",
    }));

    // ==================================================
    // 12. Dropdown สังกัด
    // ==================================================
    const factions = FACTION_OPTIONS;

    // ==================================================
    // 13. Dropdown แผนก
    // ==================================================
    let departmentOptionsFilter = "";

    if (factionId !== null) {
      departmentOptionsFilter += `
        AND TRY_CONVERT(INT, pc.faction) = :factionId
      `;
    }

    if (departmentId !== null) {
      departmentOptionsFilter += `
        AND TRY_CONVERT(INT, pc.department) = :departmentId
      `;
    }

    const departments = await sequelize.query(
      `
        SELECT DISTINCT
          d.id,
          d.name

        FROM ${db}.dbo.department AS d

        WHERE EXISTS (
          SELECT 1
          FROM ${db}.dbo.person_complaint AS pc

          WHERE TRY_CONVERT(INT, pc.department) = d.id
          ${departmentOptionsFilter}
        )

        ORDER BY d.name
      `,
      {
        replacements: filterReplacements,
        type: QueryTypes.SELECT,
      }
    );

    // ==================================================
    // 14. Statistics
    // ==================================================
    const statistics = {
      total: overview.total,
      processing: overview.processing,
      completed: overview.completed,
      avgCloseDays: null,
    };

    // ==================================================
    // 15. ส่ง Response
    // ==================================================
    return res.json({
      success: true,

      filters: {
        months,
        factionId,
        departmentId,
      },

      factions,
      departments,
      overview,
      statistics,
      status: statusBreakdown,
      monthlyTrend,
      severityBreakdown,
      generalRiskBreakdown,
      departmentBreakdown,
      followUpItems,
    });
  } catch (error) {
    console.error("Risk Dashboard error:", error);

    const sqlErrors =
      error?.parent?.errors ||
      error?.original?.errors ||
      [];

    if (sqlErrors.length > 0) {
      console.error(
        "Risk Dashboard SQL details:",
        sqlErrors.map((item) => ({
          message: item.message,
          number: item.number,
          lineNumber: item.lineNumber,
          state: item.state,
        }))
      );
    }

    return res.status(500).json({
      success: false,
      message: "ไม่สามารถโหลดข้อมูล Dashboard ได้",
      detail: error.message,
    });
  }
};

module.exports = { getRiskDashboard };
