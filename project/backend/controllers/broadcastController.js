const { sequelize } = require("../config/dbConn");
const { QueryTypes } = require("sequelize");

const DB_NAME = process.env.DB_NAME;

const getCenter1 = async (payload = {}) => {
  try {
    const { reportNo, hn, startDate, endDate, patientType, severity, status } =
      payload;

    let whereClause = `WHERE com.formstatus != '3'`;
    const replacements = {};

    if (reportNo) {
      whereClause += ` AND com.reportid LIKE :reportNo`;
      replacements.reportNo = `%${reportNo}%`;
    }

    if (hn) {
      whereClause += ` AND com.hn LIKE :hn`;
      replacements.hn = `%${hn}%`;
    }

    if (startDate) {
      whereClause += ` AND CAST(com.date AS DATE) = :startDate`;
      replacements.startDate = startDate;
    }


    if (patientType) {
      whereClause += ` AND com.type = :patientType`;
      replacements.patientType = patientType;
    }

    if (severity === "suggestion") {
      whereClause += ` AND com.suggestion IN ('A','B')`;
    }

    if (severity === "complaint") {
      whereClause += ` AND com.suggestion IN ('C','D','E','F','G','H','I')`;
    }
// =====================================================
// STATUS FILTER
// =====================================================

if (status === "__NULL__" || status === null) {

  // ข้อร้องเรียนใหม่: risk ต้องเป็น NULL
  whereClause += `
    AND com.risk IS NULL
    AND com.deleteAt IS NULL
  `;

} else if (String(status) === "5") {

  // ไม่ใช่ข้อร้องเรียน: สนใจ com.status = 0 เท่านั้น
  // ไม่กรอง com.risk
  whereClause += `
    AND com.status = 0
  `;

} else if (status !== undefined && status !== "") {

  const statusValue = Number(status);

  if (!Number.isFinite(statusValue)) {
    throw new Error(`Invalid status: ${status}`);
  }

  whereClause += `
    AND com.risk = :status
    AND com.deleteAt IS NULL
  `;

  replacements.status = statusValue;
}
    const sql = `
      SELECT
        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
        com.date,
        com.involved,
        com.formstatus,
        com.status,
  com.record_other,
      com.complaints_other,
          com.name,
            com.related,
              com.phone,
                com.patient_hn,
                  com.patient_name,
com.patient_age,
MAX(CAST(com.remark AS NVARCHAR(MAX))) AS remark,
         com.summarize,
           com.complaints,
           com1.managementremark,
           com1.responseDueDate,
           dept.deptrelate_name AS deptrelate,
com1.date as riskdate,
         com.type,
         com.createAt,com.updateAt,com1.updateAt,
         com1.createAt as riskcreatedate,
    cr.createAt as comrescreatedate,
com.urgentDate,
        CONCAT( u.name, ' ', u.lastname) AS requestby,
        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX)) + N' / ' + CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons
      FROM ${DB_NAME}.dbo.Complaints com
            LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1 ON com1.reportid = com.reportid
            OUTER APPLY (
    SELECT STRING_AGG(d.name, ', ') AS deptrelate_name
    FROM OPENJSON(com1.deptrelate) j
    LEFT JOIN ${DB_NAME}.dbo.department d
        ON d.id = TRY_CAST(j.value AS INT)
) dept
 LEFT JOIN ${DB_NAME}.dbo.ComplaintResponse cr
    ON cr.reportid = com.reportid
      LEFT JOIN ${DB_NAME}.dbo.person_complaint p ON p.reportid = com.reportid
      LEFT JOIN ${DB_NAME}.dbo.department dep ON dep.id = p.department
      LEFT JOIN ${DB_NAME}.dbo.[user] u ON u.userid = com.createby
      ${whereClause}
      GROUP BY
        com.id,
          com.reportid,
        com.reply,
        com.risk,
        com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
        com.date,
          com.record_other,
      com.complaints_other,
        com.involved,
        dept.deptrelate_name,
        com.formstatus,
          com.summarize,
          com.status,
           com.complaints,
         com.type,
 com.name,
            com.related,
              com.phone,
                com.patient_hn,
                  com.patient_name,
com.patient_age,

          com1.managementremark,
           com.createAt,com.updateAt,com1.updateAt,
           com1.createAt,
           cr.createAt,
           com1.responseDueDate,
           com1.date,
           com.urgentDate,
        u.title, u.name, u.lastname
             order by       CASE
        WHEN com.updateAt IS NULL THEN com1.updateAt
        WHEN com1.updateAt IS NULL THEN com.updateAt
        WHEN com.updateAt >= com1.updateAt THEN com.updateAt
        ELSE com1.updateAt
    END DESC,
    com.risk ASC
    `;

    return sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });
  } catch (err) {
    console.error("getCenter1 error:", err);
    return [];
  }
};

const getCenter2 = async (payload = {}) => {
  try {
const {
  createby,
  excludeStatus,
  reportNo,
  hn,
  startDate,
  endDate,
  patientType,
  severity,
  status,
  userDepID,
  userAffID,
  userLevel
} = payload;

    let whereClause = `WHERE 1=1`;
    const replacements = {};

    // Level 1
    // เห็นเฉพาะ Department ตัวเอง
  // =====================================================
// PERMISSION
// =====================================================

// Level 1 → เห็นเฉพาะ Department ตัวเอง
// =====================================================
// PERMISSION FILTER
// =====================================================

// Level 1 → เห็นเฉพาะ Department ตัวเอง
if (userLevel) {

  // หา department ของ USER ที่ login
  whereClause += `
    AND u.dep = (
      SELECT u2.dep
      FROM ${DB_NAME}.dbo.[user] u2
      WHERE u2.userid = :createby
    )
  `;

  replacements.createby = createby;
}

// Level 2 → เห็นทุก Department ภายใต้ Affiliation ตัวเอง

    if (excludeStatus) {
      whereClause += ` AND com.formstatus != :excludeStatus`;
      replacements.excludeStatus = excludeStatus;
    }

    if (reportNo) {
      whereClause += `
 AND com.reportid LIKE :reportNo
 `;
      replacements.reportNo = `%${reportNo}%`;
    }

    if (hn) {
      whereClause += `
 AND com.hn LIKE :hn
 `;
      replacements.hn = `%${hn}%`;
    }

    if (patientType) {
      whereClause += ` AND com.type = :patientType`;
      replacements.patientType = patientType;
    }

    if (severity === "suggestion") {
      whereClause += ` AND com.suggestion IN ('A','B')`;
    }

    if (severity === "complaint") {
      whereClause += ` AND com.suggestion IN ('C','D','E','F','G','H','I')`;
    }

if (status === "__NULL__" || status === null) {

  // ข้อร้องเรียนใหม่: risk ต้องเป็น NULL
  whereClause += `
    AND com.risk IS NULL
    AND com.deleteAt IS NULL
  `;

} else if (String(status) === "5") {

  // ไม่ใช่ข้อร้องเรียน: สนใจ com.status = 0 เท่านั้น
  // ไม่กรอง com.risk
  whereClause += `
    AND com.status = 0
  `;

} else if (status !== undefined && status !== "") {

  const statusValue = Number(status);

  if (!Number.isFinite(statusValue)) {
    throw new Error(`Invalid status: ${status}`);
  }

  whereClause += `
    AND com.risk = :status
    AND com.deleteAt IS NULL
  `;

  replacements.status = statusValue;
}
    const sql = `
      SELECT
        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.formstatus,
        com.date,
        com.involved,
        dept.deptrelate_name AS deptrelate,
         com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
           com.complaints,
com.summarize,
   com.record_other,
      com.complaints_other,

             com.status,
            com1.managementremark,
         com.type,
          com.createAt,com.updateAt,
        CONCAT( u.name, ' ', u.lastname) AS requestby,
        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX)) + N' / ' + CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons,
        CONCAT('[', STRING_AGG(CAST(dep.id AS NVARCHAR(MAX)), ','), ']') AS dep_ids
      FROM ${DB_NAME}.dbo.Complaints com
      LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1 ON com1.reportid = com.reportid
  OUTER APPLY (
  SELECT STRING_AGG(d.name, ', ') AS deptrelate_name
  FROM OPENJSON(com1.deptrelate) j
  INNER JOIN ${DB_NAME}.dbo.department d
    ON d.id = TRY_CAST(j.value AS INT)
) dept
      LEFT JOIN ${DB_NAME}.dbo.person_complaint p ON p.reportid = com.reportid
      LEFT JOIN ${DB_NAME}.dbo.department dep ON dep.id = p.department
      LEFT JOIN ${DB_NAME}.dbo.[user] u ON u.userid = com.createby
         ${whereClause}
      GROUP BY
        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.formstatus,
        com.date,
        com.involved,
        com.summarize,
        dept.deptrelate_name,
         com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
           com.complaints,
            com1.managementremark,
              com.status,
         com.type,
           com.record_other,
      com.complaints_other,
           com.createAt,com.updateAt,
        u.title, u.name, u.lastname
        order by  com.updateAt DESC, com.risk ASC  ,com.createAt DESC

    `;

    const result = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

   
    return result;
  } catch (err) {
    console.error("getCenter2 error:", err);

    if (err.parent?.errors) {
      err.parent.errors.forEach((e, i) => {
        console.error("SQL ERROR", i, e.message);
      });
    }

    return [];
  }
};
const getCenter3 = async (payload = {}) => {
  try {
    const {
      excludeStatus,
      risks = [],
      dep,

      reportNo,
      hn,
      startDate,
      endDate,
      patientType,
      severity,
      status,

      // =========================
      // USER PERMISSION
      // =========================
      userID,
      userDepID,
      userAffID,
      userLevel,
    } = payload;

    // =====================================================
    // WHERE
    // =====================================================

    let whereClause = `WHERE 1=1`;

    const replacements = {};

    // =====================================================
    // PERMISSION FILTER
    // =====================================================

    /*
    |--------------------------------------------------------------------------
    | LEVEL 1
    |--------------------------------------------------------------------------
    | เห็นเฉพาะ Department ตัวเอง
    |
    | รองรับ 2 แบบ:
    |
    | 1. มี DepID
    | 2. มีชื่อ Department (dep)
    |
    | ถ้ามีทั้งสองตัว -> ใช้ OR
    | ตรงอันไหนก็ผ่าน
    |
    | ถ้าไม่มีทั้งสองตัว -> ไม่ให้เห็นข้อมูล
    |--------------------------------------------------------------------------
    */

    if (Number(userLevel) === 1) {

      const hasDepID =
        userDepID !== null &&
        userDepID !== undefined &&
        userDepID !== "" &&
        !Number.isNaN(Number(userDepID));

      const hasDepName =
        typeof dep === "string" &&
        dep.trim() !== "" &&
        dep.trim() !== "-";

      // ===================================================
      // มีทั้ง DepID และชื่อแผนก
      // ===================================================

      if (hasDepID && hasDepName) {

        whereClause += `
          AND (
            EXISTS (
              SELECT 1
              FROM OPENJSON(com1.deptrelate) j
              WHERE TRY_CAST(j.value AS INT) = :userDepID
            )

            OR

            dept.deptrelate_name LIKE :dep
          )
        `;

        replacements.userDepID = Number(userDepID);
        replacements.dep = `%${dep.trim()}%`;
      }

      // ===================================================
      // มีเฉพาะ DepID
      // ===================================================

      else if (hasDepID) {

        whereClause += `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j
            WHERE TRY_CAST(j.value AS INT) = :userDepID
          )
        `;

        replacements.userDepID = Number(userDepID);
      }

      // ===================================================
      // มีเฉพาะชื่อแผนก
      // ===================================================

      else if (hasDepName) {

        whereClause += `
          AND dept.deptrelate_name LIKE :dep
        `;

        replacements.dep = `%${dep.trim()}%`;
      }

      // ===================================================
      // ไม่มีทั้ง DepID และชื่อแผนก
      // ===================================================

      else {

        // ป้องกัน Level 1 ที่ไม่มีข้อมูล Department
        // ไม่ให้เห็นข้อมูลทั้งหมด

        whereClause += `
          AND 1 = 0
        `;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | LEVEL 2
    |--------------------------------------------------------------------------
    | เห็นทุก Department ภายใต้ Affiliation ตัวเอง
    |--------------------------------------------------------------------------
    */

    else if (Number(userLevel) === 2) {

      whereClause += `
        AND EXISTS (
          SELECT 1
          FROM OPENJSON(com1.deptrelate) j

          INNER JOIN ${DB_NAME}.dbo.department d
            ON d.id = TRY_CAST(j.value AS INT)

          WHERE d.relateid = :userAffID
        )
      `;

      replacements.userAffID = Number(userAffID);
    }

    /*
    |--------------------------------------------------------------------------
    | LEVEL 3+
    |--------------------------------------------------------------------------
    | เห็นทั้งหมด
    |--------------------------------------------------------------------------
    */

    else if (Number(userLevel) >= 3) {

      // ไม่ต้องเพิ่ม Permission Filter
    }

    // =====================================================
    // SEARCH FILTER
    // =====================================================

    /*
    |--------------------------------------------------------------------------
    | EXCLUDE FORM STATUS
    |--------------------------------------------------------------------------
    */

    if (excludeStatus) {

      whereClause += `
        AND com.formstatus != :excludeStatus
      `;

      replacements.excludeStatus = excludeStatus;
    }

    /*
    |--------------------------------------------------------------------------
    | RISK
    |--------------------------------------------------------------------------
    */

 if (Array.isArray(risks) && risks.length > 0) {
  whereClause += `
    AND com.risk IN (:risks)
  `;

  replacements.risks = risks;
}
    /*
    |--------------------------------------------------------------------------
    | REPORT NO
    |--------------------------------------------------------------------------
    */

    if (reportNo) {

      whereClause += `
        AND com.reportid LIKE :reportNo
      `;

      replacements.reportNo = `%${reportNo}%`;
    }

    /*
    |--------------------------------------------------------------------------
    | HN
    |--------------------------------------------------------------------------
    */

    if (hn) {

      whereClause += `
        AND com.hn LIKE :hn
      `;

      replacements.hn = `%${hn}%`;
    }

    /*
    |--------------------------------------------------------------------------
    | START DATE
    |--------------------------------------------------------------------------
    */

    if (startDate) {

      whereClause += `
        AND CAST(com.date AS DATE) = :startDate
      `;

      replacements.startDate = startDate;
    }

    /*
    |--------------------------------------------------------------------------
    | END DATE
    |--------------------------------------------------------------------------
    |
    | ตอนนี้ของเดิมรับ endDate มาแต่ไม่ได้ใช้
    | ผมเพิ่มให้เลย
    |--------------------------------------------------------------------------
    */

    if (endDate) {

      whereClause += `
        AND CAST(com.date AS DATE) <= :endDate
      `;

      replacements.endDate = endDate;
    }

    /*
    |--------------------------------------------------------------------------
    | PATIENT TYPE
    |--------------------------------------------------------------------------
    */

    if (patientType) {

      whereClause += `
        AND com.type = :patientType
      `;

      replacements.patientType = patientType;
    }

    /*
    |--------------------------------------------------------------------------
    | SEVERITY
    |--------------------------------------------------------------------------
    */

    if (severity === "suggestion") {

      whereClause += `
        AND com.suggestion IN ('A', 'B')
      `;
    }

    if (severity === "complaint") {

      whereClause += `
        AND com.suggestion IN (
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I'
        )
      `;
    }

    /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */
if (status === "__NULL__" || status === null) {

  // ข้อร้องเรียนใหม่: risk ต้องเป็น NULL
  whereClause += `
    AND com.risk IS NULL
    AND com.deleteAt IS NULL
  `;

} else if (String(status) === "5") {

  // ไม่ใช่ข้อร้องเรียน: สนใจ com.status = 0 เท่านั้น
  // ไม่กรอง com.risk
  whereClause += `
    AND com.status = 0
  `;

} else if (status !== undefined && status !== "") {

  const statusValue = Number(status);

  if (!Number.isFinite(statusValue)) {
    throw new Error(`Invalid status: ${status}`);
  }

  whereClause += `
    AND com.risk = :status
    AND com.deleteAt IS NULL
  `;

  replacements.status = statusValue;
}



// LEVEL 4 : DIRECTOR / VIEWER
else if (Number(userLevel) === 4) {

  const directorID = String(userID);

  // ผอ. ที่เห็นทุกแผนก
  const allDepartmentDirectors = [
    "690413",
    "651038",
  ];

  if (allDepartmentDirectors.includes(directorID)) {

    // เห็นทุกแผนก ไม่ต้องกรอง

  } else {

    // ผอ. อีก 4 คน เห็นตาม Affiliation ตัวเอง
    whereClause += `
      AND EXISTS (
        SELECT 1
        FROM OPENJSON(com1.deptrelate) j
        INNER JOIN ${DB_NAME}.dbo.department d
          ON d.id = TRY_CAST(j.value AS INT)
        WHERE d.relateid = :userAffID
      )
    `;

    replacements.userAffID = Number(userAffID);

  }

}
    // =====================================================
    // SQL
    // =====================================================

    const sql = `
      SELECT

        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.formstatus,
        com.date,
        com.involved,

        dept.deptrelate_name AS deptrelate,

        com.record_other,
        com.complaints_other,
        com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,

        com1.managementremark,
com.summarize,
        com.createAt,
        com.updateAt,

        com.complaints,
        com.type,
        com.status,

        CONCAT(
          u.name,
          ' ',
          u.lastname
        ) AS requestby,

        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX))
          + N' / ' +
          CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons

      FROM ${DB_NAME}.dbo.Complaints com

      /*
      |--------------------------------------------------------------------------
      | RISK MANAGEMENT
      |--------------------------------------------------------------------------
      */

      LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
        ON com1.reportid = com.reportid

      /*
      |--------------------------------------------------------------------------
      | PERSON COMPLAINT
      |--------------------------------------------------------------------------
      */

      LEFT JOIN ${DB_NAME}.dbo.person_complaint p
        ON p.reportid = com.reportid

      /*
      |--------------------------------------------------------------------------
      | DEPARTMENT RELATE
      |--------------------------------------------------------------------------
      |
      | deptrelate เก็บเป็น JSON เช่น:
      |
      | [103,147]
      |
      | แล้วเอา ID ไปหา department.name
      |--------------------------------------------------------------------------
      */

      OUTER APPLY (

        SELECT
          STRING_AGG(
            d.name,
            ', '
          ) AS deptrelate_name

        FROM OPENJSON(com1.deptrelate) j

        LEFT JOIN ${DB_NAME}.dbo.department d
          ON d.id = TRY_CAST(j.value AS INT)

      ) dept

      /*
      |--------------------------------------------------------------------------
      | PERSON DEPARTMENT
      |--------------------------------------------------------------------------
      */

      LEFT JOIN ${DB_NAME}.dbo.department dep
        ON dep.id = p.department

      /*
      |--------------------------------------------------------------------------
      | USER
      |--------------------------------------------------------------------------
      */

      LEFT JOIN ${DB_NAME}.dbo.[user] u
        ON u.userid = com.createby

      /*
      |--------------------------------------------------------------------------
      | WHERE
      |--------------------------------------------------------------------------
      */

      ${whereClause}

      /*
      |--------------------------------------------------------------------------
      | GROUP BY
      |--------------------------------------------------------------------------
      */

      GROUP BY

        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.formstatus,
        com.date,
        com.involved,
        com.status,
com.summarize,
        dept.deptrelate_name,

        com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
        com.complaints,

        com.record_other,
        com.complaints_other,

        com1.managementremark,

        com.type,

        com.createAt,
        com.updateAt,

        u.title,
        u.name,
        u.lastname

      /*
      |--------------------------------------------------------------------------
      | ORDER
      |--------------------------------------------------------------------------
      */

      ORDER BY
        com.createAt DESC,
        com.updateAt DESC
    `;

    // =====================================================
    // DEBUG
    // =====================================================

   const result = await sequelize.query(sql, {
  replacements,
  type: QueryTypes.SELECT,
});

const target = result.find(
  (x) => String(x.reportid).trim() === "0021026"
);

return result;

  } catch (err) {

    console.error("getCenter3 error:", err);

    if (err.parent?.errors) {

      err.parent.errors.forEach((e, i) => {

        console.error(
          "SQL ERROR",
          i,
          e.message
        );

      });
    }

    return [];
  }
};
const getCenter4 = async (payload = {}) => {
  try {
    const {
      formStatus,
      risks = [],
      reportNo,
      hn,
      startDate,
      endDate,
      patientType,
      severity,
      status,
    } = payload;
    let whereClause = `WHERE 1=1`;
    const replacements = {};

    if (formStatus) {
      whereClause += ` AND com.formstatus != :formStatus`;
      replacements.formStatus = formStatus;
    }

    // ✅ risk IN (...)
    if (Array.isArray(risks) && risks.length > 0) {
      whereClause += ` AND com.risk IN (:risks)`;
      replacements.risks = risks;
    }

    if (reportNo) {
      whereClause += `
    AND com.reportid LIKE :reportNo
  `;
      replacements.reportNo = `%${reportNo}%`;
    }

    if (hn) {
      whereClause += `
    AND com.hn LIKE :hn
  `;
      replacements.hn = `%${hn}%`;
    }

    if (startDate) {
      whereClause += `
    AND CAST(com.date AS DATE) = :startDate
  `;
      replacements.startDate = startDate;
    }


    if (patientType) {
      whereClause += `
    AND com.type = :patientType
  `;
      replacements.patientType = patientType;
    }

    if (severity === "suggestion") {
      whereClause += `
    AND com.suggestion IN ('A','B')
  `;
    }

    if (severity === "complaint") {
      whereClause += `
    AND com.suggestion IN ('C','D','E','F','G','H','I')
  `;
    }
if (status === "__NULL__" || status === null) {

  // ข้อร้องเรียนใหม่: risk ต้องเป็น NULL
  whereClause += `
    AND com.risk IS NULL
    AND com.deleteAt IS NULL
  `;

} else if (String(status) === "5") {

  // ไม่ใช่ข้อร้องเรียน: สนใจ com.status = 0 เท่านั้น
  // ไม่กรอง com.risk
  whereClause += `
    AND com.status = 0
  `;

} else if (status !== undefined && status !== "") {

  const statusValue = Number(status);

  if (!Number.isFinite(statusValue)) {
    throw new Error(`Invalid status: ${status}`);
  }

  whereClause += `
    AND com.risk = :status
    AND com.deleteAt IS NULL
  `;

  replacements.status = statusValue;
}
    const sql = `
      SELECT
        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.formstatus,
        com.date,
        com.involved,
        com.summarize,
          com.status,
               dept.deptrelate_name AS deptrelate,
         com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
           com.complaints,
             com.record_other,
      com.complaints_other,
         com.type,
          com1.managementremark,
          com.createAt,com.updateAt,
        CONCAT( u.name, ' ', u.lastname) AS requestby,
        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX)) + N' / ' + CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons
      FROM ${DB_NAME}.dbo.Complaints com
      LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
        ON com1.reportid = com.reportid
           OUTER APPLY (
    SELECT STRING_AGG(d.name, ', ') AS deptrelate_name
    FROM OPENJSON(com1.deptrelate) j
    LEFT JOIN ${DB_NAME}.dbo.department d
        ON d.id = TRY_CAST(j.value AS INT)
) dept
      LEFT JOIN ${DB_NAME}.dbo.person_complaint p
        ON p.reportid = com.reportid
      LEFT JOIN ${DB_NAME}.dbo.department dep
        ON dep.id = p.department
      LEFT JOIN ${DB_NAME}.dbo.[user] u
        ON u.userid = com.createby
      ${whereClause}
      GROUP BY
        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.formstatus,
        com.date,
        com.involved,
        dept.deptrelate_name,
          com.status,
         com1.managementremark,
         com.suggestion,com.generalRisk,com.clinicalRisk,com.generalRiskLevel,
           com.record_other,
      com.complaints_other,
      com.summarize,
           com.complaints,
         com.type,
           com.createAt,com.updateAt,
        u.title, u.name, u.lastname
        order by     com.createAt DESC,
    com.updateAt DESC
    `;

    return await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements,
    });
  } catch (err) {
    console.error("getCenter2 error:", err);

    if (err.parent?.errors) {
      err.parent.errors.forEach((e, i) => {
        console.error("SQL ERROR", i, e.message);
      });
    }

    return [];
  }
};
const getMenuCount = async (payload = {}) => {
  try {
    const {
      createby,
      userID,
      dep,
      userDepID,
      userAffID,
      userLevel,
    } = payload;

    const level = Number(userLevel);

    /* =========================================================
       USER PERMISSION DATA
    ========================================================= */

    const hasDepID =
      userDepID !== null &&
      userDepID !== undefined &&
      userDepID !== "" &&
      !Number.isNaN(Number(userDepID));

    const hasDepName =
      typeof dep === "string" &&
      dep.trim() !== "" &&
      dep.trim() !== "-";

    const replacements = {
      createby,
    };

    /* =========================================================
       COMMON PERMISSION
       ใช้ร่วมกัน ADMIN / RESPONSE / SUMMARY
    ========================================================= */

    let permissionSQL = "";

    // LEVEL 1 : เห็นเฉพาะแผนกตัวเอง
    if (level === 1) {

      if (hasDepID && hasDepName) {

        permissionSQL = `
          AND (
            EXISTS (
              SELECT 1
              FROM OPENJSON(com1.deptrelate) j
              WHERE TRY_CAST(j.value AS INT) = :userDepID
            )
            OR EXISTS (
              SELECT 1
              FROM OPENJSON(com1.deptrelate) j
              INNER JOIN ${DB_NAME}.dbo.department d2
                ON d2.id = TRY_CAST(j.value AS INT)
              WHERE d2.name LIKE :dep
            )
          )
        `;

        replacements.userDepID = Number(userDepID);
        replacements.dep = `%${dep.trim()}%`;

      } else if (hasDepID) {

        permissionSQL = `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j
            WHERE TRY_CAST(j.value AS INT) = :userDepID
          )
        `;

        replacements.userDepID = Number(userDepID);

      } else if (hasDepName) {

        permissionSQL = `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j
            INNER JOIN ${DB_NAME}.dbo.department d2
              ON d2.id = TRY_CAST(j.value AS INT)
            WHERE d2.name LIKE :dep
          )
        `;

        replacements.dep = `%${dep.trim()}%`;

      } else {

        permissionSQL = ` AND 1 = 0 `;

      }
    }

    // LEVEL 2 : เห็นทุกแผนกใน Affiliation ตัวเอง
    else if (level === 2) {

      if (
        userAffID === null ||
        userAffID === undefined ||
        userAffID === "" ||
        !Number.isFinite(Number(userAffID))
      ) {

        permissionSQL = ` AND 1 = 0 `;

      } else {

        permissionSQL = `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j
            INNER JOIN ${DB_NAME}.dbo.department d2
              ON d2.id = TRY_CAST(j.value AS INT)
            WHERE d2.relateid = :userAffID
          )
        `;

        replacements.userAffID = Number(userAffID);

      }
    }

    // LEVEL 3 : เห็นทั้งหมด
    else if (level === 3) {

      permissionSQL = "";

    }

    // LEVEL 4 : DIRECTOR / VIEWER
    else if (level === 4) {

      const allDepartmentDirectors = [
        "690413",
        "651038",
      ];

      // ผู้อำนวยการที่เห็นทุกแผนก
      if (allDepartmentDirectors.includes(String(userID))) {

        permissionSQL = "";

      } else {

        // ผู้อำนวยการที่เห็นเฉพาะ Affiliation ตัวเอง
        if (
          userAffID === null ||
          userAffID === undefined ||
          userAffID === "" ||
          !Number.isFinite(Number(userAffID))
        ) {

          permissionSQL = ` AND 1 = 0 `;

        } else {

          permissionSQL = `
            AND EXISTS (
              SELECT 1
              FROM OPENJSON(com1.deptrelate) j
              INNER JOIN ${DB_NAME}.dbo.department d2
                ON d2.id = TRY_CAST(j.value AS INT)
              WHERE d2.relateid = :userAffID
            )
          `;

          replacements.userAffID = Number(userAffID);

        }
      }

    }

    // LEVEL อื่น ๆ : ไม่อนุญาต
    else {

      permissionSQL = ` AND 1 = 0 `;

    }


    /* =========================================================
       SQL
    ========================================================= */

    const sql = `
      SELECT

      /* =========================================
         MY COMPLAINT
         คงเงื่อนไขเดิม
      ========================================= */

      (
        SELECT COUNT(*)

        FROM ${DB_NAME}.dbo.Complaints com

        LEFT JOIN ${DB_NAME}.dbo.[user] u
          ON u.userid = com.createby

        WHERE com.formstatus != '3'

        ${
          userLevel
            ? `
              AND u.dep = (
                SELECT u2.dep
                FROM ${DB_NAME}.dbo.[user] u2
                WHERE u2.userid = :createby
              )
            `
            : `
              AND com.createby = :createby
            `
        }

      ) AS complaint,


      /* =========================================
         ADMIN
         ใช้ Permission เดียวกับ getCenter3
      ========================================= */

      (
        SELECT COUNT(*)

        FROM (

          SELECT com.id

          FROM ${DB_NAME}.dbo.Complaints com

          LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
            ON com1.reportid = com.reportid

          OUTER APPLY (
            SELECT STRING_AGG(d.name, ', ') AS deptrelate_name

            FROM OPENJSON(com1.deptrelate) j

            LEFT JOIN ${DB_NAME}.dbo.department d
              ON d.id = TRY_CAST(j.value AS INT)

          ) dept

          LEFT JOIN ${DB_NAME}.dbo.ComplaintResponse cr
            ON cr.reportid = com.reportid

          LEFT JOIN ${DB_NAME}.dbo.person_complaint p
            ON p.reportid = com.reportid

          LEFT JOIN ${DB_NAME}.dbo.department dep
            ON dep.id = p.department

          LEFT JOIN ${DB_NAME}.dbo.[user] u
            ON u.userid = com.createby

          WHERE com.formstatus != '3'

          ${permissionSQL}

          GROUP BY
            com.id,
            com.reportid,
            com.reply,
            com.risk,
            com.suggestion,
            com.generalRisk,
            com.clinicalRisk,
            com.generalRiskLevel,
            com.date,
            com.involved,
            com.formstatus,
            com.status,
            com.name,
            com.related,
            com.phone,
            com.patient_hn,
            com.patient_name,
            com.patient_age,
            com.summarize,
            com.complaints,
            com1.managementremark,
            com1.responseDueDate,
            dept.deptrelate_name,
            com1.date,
            com.type,
            com.createAt,
            com.updateAt,
            com1.updateAt,
            com1.createAt,
            cr.createAt,
            com.urgentDate,
            u.title,
            u.name,
            u.lastname

        ) AS admin_data

      ) AS admin,


      /* =========================================
         RESPONSE
         ใช้ Permission เดียวกับ getCenter3
      ========================================= */

      (
        SELECT COUNT(DISTINCT com.id)

        FROM ${DB_NAME}.dbo.Complaints com

        INNER JOIN ${DB_NAME}.dbo.RiskManagement com1
          ON com1.reportid = com.reportid

        WHERE com.formstatus != '3'

          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j
            WHERE TRY_CAST(j.value AS INT) IS NOT NULL
          )

          ${permissionSQL}

      ) AS response,


      /* =========================================
         SUMMARY
         เพิ่ม JOIN เพื่อให้กรองตาม deptrelate ได้
      ========================================= */

   (
  SELECT COUNT(*)

  FROM ${DB_NAME}.dbo.Complaints com

  LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
    ON com1.reportid = com.reportid

  WHERE com.formstatus != '3'

    AND com.risk IN (2,3,4)

    AND com.deleteAt IS NULL

    ${permissionSQL}

) AS summary

    `;


    return await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

  } catch (err) {

    console.error("getMenuCount error:", err);

    if (err.parent?.errors) {

      err.parent.errors.forEach((e, i) => {
        console.error("SQL ERROR", i, e.message);
      });

    }

    return [];
  }
};

module.exports = {
  getCenter1,
  getCenter2,
  getCenter3,
  getCenter4,
  getMenuCount,
};
