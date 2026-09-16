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

    if (status) {
      whereClause += ` AND com.risk = :status`;
      replacements.status = Number(status);
    }
    const sql = `
      SELECT
        com.id,
        com.reportid,
        com.reply,
        com.risk,
        com.suggestion,
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
        com.suggestion,
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

    if (status) {
      whereClause += ` AND com.risk = :status`;
      replacements.status = Number(status);
    }
    if (startDate) {
      whereClause += `
 AND CAST(com.date AS DATE)=:startDate
 `;
      replacements.startDate = startDate;
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
         com.suggestion,
           com.complaints,

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
        dept.deptrelate_name,
         com.suggestion,
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
        AND (
          com.risk IN (:risks)
          OR com.risk IS NULL
        )
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

    if (status) {

      whereClause += `
        AND com.risk = :status
      `;

      replacements.status = Number(status);
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
        com.suggestion,

        com1.managementremark,

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

        dept.deptrelate_name,

        com.suggestion,
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

    console.log("======================================");
    console.log("getCenter3 PAYLOAD");
    console.log(payload);

    console.log("getCenter3 REPLACEMENTS");
    console.log(replacements);

    console.log("getCenter3 WHERE");
    console.log(whereClause);

    console.log("======================================");

    // =====================================================
    // EXECUTE
    // =====================================================

    return await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

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

    if (status) {
      whereClause += `
    AND com.risk = :status
  `;
      replacements.status = Number(status);
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
          com.status,
               dept.deptrelate_name AS deptrelate,
         com.suggestion,
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
         com.suggestion,
           com.record_other,
      com.complaints_other,
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
      dep,
      userDepID,
      userAffID,
      userLevel,
    } = payload;

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
      userAffID: Number(userAffID),
    };


    /* =========================================================
       LEVEL 1 PERMISSION
       ใช้แบบเดียวกับ getCenter3
    ========================================================= */

    let responsePermission = "";

    if (Number(userLevel) === 1) {

      /*
      ---------------------------------------------------------
      มีทั้ง DepID + Department Name
      ใช้ OR
      ---------------------------------------------------------
      */

      if (hasDepID && hasDepName) {

        responsePermission = `
          AND (
            EXISTS (
              SELECT 1
              FROM OPENJSON(com1.deptrelate) j
              WHERE TRY_CAST(j.value AS INT) = :userDepID
            )

            OR

            EXISTS (
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
      }


      /*
      ---------------------------------------------------------
      มีเฉพาะ DepID
      ---------------------------------------------------------
      */

      else if (hasDepID) {

        responsePermission = `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j
            WHERE TRY_CAST(j.value AS INT) = :userDepID
          )
        `;

        replacements.userDepID = Number(userDepID);
      }


      /*
      ---------------------------------------------------------
      มีเฉพาะ Department Name
      ---------------------------------------------------------
      */

      else if (hasDepName) {

        responsePermission = `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com1.deptrelate) j

            INNER JOIN ${DB_NAME}.dbo.department d2
              ON d2.id = TRY_CAST(j.value AS INT)

            WHERE d2.name LIKE :dep
          )
        `;

        replacements.dep = `%${dep.trim()}%`;
      }


      /*
      ---------------------------------------------------------
      ไม่มีทั้ง DepID และ Department Name
      ป้องกัน Level 1 เห็นข้อมูลทั้งหมด
      ---------------------------------------------------------
      */

      else {

        responsePermission = `
          AND 1 = 0
        `;
      }
    }


    /* =========================================================
       LEVEL 2
       เห็นทุก Department ภายใต้ Affiliation ตัวเอง
    ========================================================= */

    else if (Number(userLevel) === 2) {

      responsePermission = `
        AND EXISTS (
          SELECT 1
          FROM OPENJSON(com1.deptrelate) j

          INNER JOIN ${DB_NAME}.dbo.department d2
            ON d2.id = TRY_CAST(j.value AS INT)

          WHERE d2.relateid = :userAffID
        )
      `;
    }


    /* =========================================================
       LEVEL 3+
       เห็นทั้งหมด
    ========================================================= */


    const sql = `
      SELECT


      /* =========================================
         MY COMPLAINT
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

          GROUP BY
            com.id,
            com.reportid,
            com.reply,
            com.risk,
            com.suggestion,
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


          /* =========================================
             ต้องมี Department จริงก่อน
          ========================================= */

          AND EXISTS (
            SELECT 1

            FROM OPENJSON(com1.deptrelate) j

            WHERE TRY_CAST(j.value AS INT) IS NOT NULL
          )


          /* =========================================
             LEVEL 1
             Department ตัวเอง
          ========================================= */

          ${responsePermission}


          /* =========================================
             LEVEL 3+
             ไม่ต้องเพิ่ม Permission
          ========================================= */

      ) AS response,


      /* =========================================
         SUMMARY
      ========================================= */

      (
        SELECT COUNT(*)

        FROM ${DB_NAME}.dbo.Complaints com

        WHERE com.formstatus != '3'

          AND com.risk IN (2,3)

      ) AS summary
    `;


    /* =========================================================
       DEBUG
    ========================================================= */

    console.log("======================================");
    console.log("getMenuCount PAYLOAD");
    console.log(payload);

    console.log("getMenuCount PERMISSION");
    console.log(responsePermission);

    console.log("getMenuCount REPLACEMENTS");
    console.log(replacements);

    console.log("======================================");


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
