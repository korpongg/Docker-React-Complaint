const { sequelize } = require("../config/dbConn");
const { QueryTypes } = require("sequelize");

const DB_NAME = process.env.DB_NAME;

/* =========================================================
   GET CENTER 1
   risk = 0
========================================================= */

const getCenter1 = async (payload = {}) => {
  try {
    const {
      reportNo,
      hn,
      startDate,
      endDate,
      patientType,
      severity,
      status,
    } = payload;

    let whereClause = `
      WHERE com.formstatus != '3'
      AND com.risk >= '0'
    `;

    const replacements = {};

    /* =====================================================
       REPORT NO
    ===================================================== */

    if (reportNo) {
      whereClause += `
        AND com.reportid LIKE :reportNo
      `;

      replacements.reportNo = `%${reportNo}%`;
    }

    /* =====================================================
       HN
    ===================================================== */

    if (hn) {
      whereClause += `
        AND com.hn LIKE :hn
      `;

      replacements.hn = `%${hn}%`;
    }

    /* =====================================================
       DATE
    ===================================================== */

    if (startDate) {
      whereClause += `
        AND CAST(com.occurrencedate AS DATE) >= :startDate
      `;

      replacements.startDate = startDate;
    }

    if (endDate) {
      whereClause += `
        AND CAST(com.occurrencedate AS DATE) <= :endDate
      `;

      replacements.endDate = endDate;
    }

    /* =====================================================
       PATIENT TYPE
    ===================================================== */

    if (patientType) {
      whereClause += `
        AND com.type = :patientType
      `;

      replacements.patientType = patientType;
    }

    /* =====================================================
       SEVERITY
    ===================================================== */

    if (severity) {
      whereClause += `
        AND com.reporttype = :severity
      `;

      replacements.severity = severity;
    }
    
       /* =====================================================
       SEVERITY
    ===================================================== */

    if (status) {
      whereClause += `
        AND com.risk = :status
      `;

      replacements.status = status;
    }

    /* =====================================================
       SQL
    ===================================================== */

    const sql = `
      SELECT

        /* ===================================================
           Complaints
        =================================================== */

        com.id,
        com.reportid,
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,

        com.suggestion,
        com.type,

        com.occurrencedate,

        com.level, com.level2,
        com.description,
        com.effectremark,
   com.reportlocation,
        com.formstatus,
  com.pct,
        com.createby,
        com.createAt,
        com.updateby,
        com.updateAt,

        /* ===================================================
           Department
        =================================================== */

        dept.deptrelate_name AS deptrelate,

        /* ===================================================
           User
        =================================================== */

        CONCAT(
          u.name,
          ' ',
          u.lastname
        ) AS requestby,

        /* ===================================================
           Person Complaint
        =================================================== */

        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX))
          + N' / ' +
          CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons

      FROM ${DB_NAME}.dbo.Complaints com

      OUTER APPLY (

        SELECT
          STRING_AGG(
            d.name,
            ', '
          ) AS deptrelate_name

        FROM OPENJSON(com.deptrelate) j

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
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,

        com.suggestion,
        com.type,

        com.occurrencedate,
  com.pct,
        com.level, com.level2,
        com.description,
        com.effectremark,

        com.formstatus,

        com.createby,
        com.createAt,
        com.updateby,
        com.updateAt,
com.reportlocation,
        dept.deptrelate_name,

        u.title,
        u.name,
        u.lastname

      ORDER BY
        com.updateAt DESC,
        com.createAt DESC
    `;

    return await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

  } catch (err) {
    console.error("getCenter1 error:", err);

    if (err.parent?.errors) {
      err.parent.errors.forEach((e, i) => {
        console.error("SQL ERROR", i, e.message);
      });
    }

    return [];
  }
};


/* =========================================================
   GET CENTER 2
   risk = 1
========================================================= */

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
      userLevel,
    } = payload;

    let whereClause = `
      WHERE 1=1
      AND com.risk >= '0'
    `;

    const replacements = {};

    /* =====================================================
       PERMISSION
    ===================================================== */

    if (userLevel) {
      whereClause += `
        AND u.dep = (
          SELECT u2.dep
          FROM ${DB_NAME}.dbo.[user] u2
          WHERE u2.userid = :createby
        )
      `;

      replacements.createby = createby;
    }

    /* =====================================================
       FORM STATUS
    ===================================================== */

    if (excludeStatus) {
      whereClause += `
        AND com.formstatus != :excludeStatus
      `;

      replacements.excludeStatus = excludeStatus;
    }

    /* =====================================================
       REPORT NO
    ===================================================== */

    if (reportNo) {
      whereClause += `
        AND com.reportid LIKE :reportNo
      `;

      replacements.reportNo = `%${reportNo}%`;
    }

    /* =====================================================
       HN
    ===================================================== */

    if (hn) {
      whereClause += `
        AND com.hn LIKE :hn
      `;

      replacements.hn = `%${hn}%`;
    }

    /* =====================================================
       DATE
    ===================================================== */

    if (startDate) {
      whereClause += `
        AND CAST(com.occurrencedate AS DATE) >= :startDate
      `;

      replacements.startDate = startDate;
    }

    if (endDate) {
      whereClause += `
        AND CAST(com.occurrencedate AS DATE) <= :endDate
      `;

      replacements.endDate = endDate;
    }

    /* =====================================================
       PATIENT TYPE
    ===================================================== */

    if (patientType) {
      whereClause += `
        AND com.type = :patientType
      `;

      replacements.patientType = patientType;
    }

    /* =====================================================
       SEVERITY
    ===================================================== */

    if (severity) {
      whereClause += `
        AND com.reporttype = :severity
      `;

      replacements.severity = severity;
    }

  if (status) {
      whereClause += `
        AND com.risk = :status
      `;

      replacements.status = status;
    }
    /* =====================================================
       SQL
    ===================================================== */

    const sql = `
      SELECT

        /* ===================================================
           Complaints
        =================================================== */

        com.id,
        com.reportid,
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,
        com.pct,

        com.reportlocation,
        com.occurrencedate,

        com.deptrelate,

        com.reporttype,
        com.type,

        com.acceptdate,
        com.responsedate,

        com.patientcare,
        com.patientcareremark,

        com.patientsupport,
        com.patientsupportremark,

        com.utility,
        com.utilityremark,

        com.equipment,
        com.equipmentremark,

        com.safety,
        com.safetyremark,

        com.service,
        com.serviceremark,

        com.management,
        com.managementremark,

        com.level, com.level2,
        com.description,
        com.renew,
        com.effectremark,

        com.reportdoc,
        com.docname,

        com.medicalrecorded,
        com.reportacknowledge,
        com.reportother,
        com.otherremark,

        com.impromptusolution,
        com.activefailure,
        com.suggestion,

        com.formstatus,
        com.comment,

        com.createby,
        com.createAt,

        com.updateby,
        com.updateAt,

        com.acceptby,
        com.acceptAt,

        com.deleteAt,

        /* ===================================================
           RiskManagement
        =================================================== */

        com1.incidentType,
        com1.severity,
        com1.attn,

        com1.deptrelate AS risk_deptrelate,

        com1.problem,
        com1.date AS risk_date,

        com1.reviewReason,
        com1.reviewOther,

        com1.managementremark AS risk_managementremark,

        com1.createby AS risk_createby,
        com1.createAt AS risk_createAt,

        com1.updateby AS risk_updateby,
        com1.updateAt AS risk_updateAt,

        com1.deleteAt AS risk_deleteAt,

        /* ===================================================
           User
        =================================================== */

        CONCAT(
          u.name,
          ' ',
          u.lastname
        ) AS requestby,

        /* ===================================================
           Department
        =================================================== */

        dept.deptrelate_name AS deptrelate,

        /* ===================================================
           Person Complaint
        =================================================== */

        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX))
          + N' / ' +
          CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons,

        CONCAT(
          '[',
          STRING_AGG(
            CAST(dep.id AS NVARCHAR(MAX)),
            ','
          ),
          ']'
        ) AS dep_ids

      FROM ${DB_NAME}.dbo.Complaints com

      LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
        ON com1.reportid = com.reportid

      OUTER APPLY (

        SELECT
          STRING_AGG(
            d.name,
            ', '
          ) AS deptrelate_name

        FROM OPENJSON(com.deptrelate) j

        INNER JOIN ${DB_NAME}.dbo.department d
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
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,
        com.pct,

        com.reportlocation,
        com.occurrencedate,

        com.deptrelate,

        com.reporttype,
        com.type,

        com.acceptdate,
        com.responsedate,

        com.patientcare,
        com.patientcareremark,

        com.patientsupport,
        com.patientsupportremark,

        com.utility,
        com.utilityremark,

        com.equipment,
        com.equipmentremark,

        com.safety,
        com.safetyremark,

        com.service,
        com.serviceremark,

        com.management,
        com.managementremark,

        com.level, com.level2,
        com.description,
        com.renew,
        com.effectremark,

        com.reportdoc,
        com.docname,

        com.medicalrecorded,
        com.reportacknowledge,
        com.reportother,
        com.otherremark,

        com.impromptusolution,
        com.activefailure,
        com.suggestion,

        com.formstatus,
        com.comment,

        com.createby,
        com.createAt,

        com.updateby,
        com.updateAt,

        com.acceptby,
        com.acceptAt,

        com.deleteAt,

        com1.incidentType,
        com1.severity,
        com1.attn,
        com1.deptrelate,
        com1.problem,
        com1.date,
        com1.reviewReason,
        com1.reviewOther,
        com1.managementremark,

        com1.createby,
        com1.createAt,
        com1.updateby,
        com1.updateAt,
        com1.deleteAt,

        dept.deptrelate_name,

        u.title,
        u.name,
        u.lastname

      ORDER BY
      com.updateAt DESC,
        com1.updateAt DESC,
        
        com.createAt DESC
    `;

    return await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
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


/* =========================================================
   GET CENTER 3
   risk = 2
   ComplaintResponse
========================================================= */

const getCenter3 = async (payload = {}) => {
  try {
    const {
      excludeStatus,
      dep,

      reportNo,
      hn,
      startDate,
      endDate,
      patientType,
      severity,
      status,

      userDepID,
      userAffID,
      userLevel,
    } = payload;

    let whereClause = `
      WHERE 1=1
      AND com.risk >= '1'
    `;

    const replacements = {};

    /* =====================================================
       LEVEL 1
    ===================================================== */

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

      if (hasDepID && hasDepName) {

        whereClause += `
          AND (
            EXISTS (
              SELECT 1
              FROM OPENJSON(com.deptrelate) j
              WHERE TRY_CAST(j.value AS INT) = :userDepID
            )

            OR

            dept.deptrelate_name LIKE :dep
          )
        `;

        replacements.userDepID = Number(userDepID);
        replacements.dep = `%${dep.trim()}%`;

      } else if (hasDepID) {

        whereClause += `
          AND EXISTS (
            SELECT 1
            FROM OPENJSON(com.deptrelate) j
            WHERE TRY_CAST(j.value AS INT) = :userDepID
          )
        `;

        replacements.userDepID = Number(userDepID);

      } else if (hasDepName) {

        whereClause += `
          AND dept.deptrelate_name LIKE :dep
        `;

        replacements.dep = `%${dep.trim()}%`;

      } else {

        whereClause += `
          AND 1 = 0
        `;
      }
    }

    /* =====================================================
       LEVEL 2
    ===================================================== */

    else if (Number(userLevel) === 2) {

      whereClause += `
        AND EXISTS (

          SELECT 1

          FROM OPENJSON(com.deptrelate) j

          INNER JOIN ${DB_NAME}.dbo.department d
            ON d.id = TRY_CAST(j.value AS INT)

          WHERE d.relateid = :userAffID

        )
      `;

      replacements.userAffID = Number(userAffID);
    }

    /* =====================================================
       EXCLUDE STATUS
    ===================================================== */

    if (excludeStatus) {

      whereClause += `
        AND com.formstatus != :excludeStatus
      `;

      replacements.excludeStatus = excludeStatus;
    }

    /* =====================================================
       REPORT NO
    ===================================================== */

    if (reportNo) {

      whereClause += `
        AND com.reportid LIKE :reportNo
      `;

      replacements.reportNo = `%${reportNo}%`;
    }

    /* =====================================================
       HN
    ===================================================== */

    if (hn) {

      whereClause += `
        AND com.hn LIKE :hn
      `;

      replacements.hn = `%${hn}%`;
    }

    /* =====================================================
       DATE
    ===================================================== */

    if (startDate) {

      whereClause += `
        AND CAST(com.occurrencedate AS DATE) >= :startDate
      `;

      replacements.startDate = startDate;
    }

    if (endDate) {

      whereClause += `
        AND CAST(com.occurrencedate AS DATE) <= :endDate
      `;

      replacements.endDate = endDate;
    }

    /* =====================================================
       PATIENT TYPE
    ===================================================== */

    if (patientType) {

      whereClause += `
        AND com.type = :patientType
      `;

      replacements.patientType = patientType;
    }

    /* =====================================================
       SEVERITY
    ===================================================== */

    if (severity) {
      whereClause += `
        AND com.reporttype = :severity
      `;

      replacements.severity = severity;
    }

  if (status) {
      whereClause += `
        AND com.risk = :status
      `;

      replacements.status = status;
    }
    /* =====================================================
       SQL
    ===================================================== */

    const sql = `
      SELECT

        /* ===================================================
           Complaints
        =================================================== */

        com.id,
        com.reportid,
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,

        com.suggestion,
        com.type,
   com.reportlocation,
        com.occurrencedate,

        com.formstatus,

        com.level, com.level2,
        com.description,
        com.effectremark,

        com.createby,
        com.createAt,
        com.updateby,
        com.updateAt,

        /* ===================================================
           RiskManagement
        =================================================== */

        com1.incidentType,
        com1.severity,
        com1.attn,

        com1.deptrelate AS risk_deptrelate,

        com1.problem,
        com1.date AS risk_date,

        com1.reviewReason,
        com1.reviewOther,
  com.pct,
        com1.managementremark AS risk_managementremark,

        com1.createby AS risk_createby,
        com1.createAt AS risk_createAt,

        com1.updateby AS risk_updateby,
        com1.updateAt AS risk_updateAt,

        com1.deleteAt AS risk_deleteAt,

        /* ===================================================
           ComplaintResponse
        =================================================== */

        cr.summary_causes,
        cr.summary_reply,
        cr.summary_analysis,
        cr.summary_solving,
        cr.summary_organization,
        cr.analysis_team,

        cr.createby AS response_createby,
        cr.createAt AS response_createAt,

        cr.updateby AS response_updateby,
        cr.updateAt AS response_updateAt,

        cr.deleteAt AS response_deleteAt,

        /* ===================================================
           Department
        =================================================== */

        dept.deptrelate_name AS deptrelate,

        /* ===================================================
           User
        =================================================== */

        CONCAT(
          u.name,
          ' ',
          u.lastname
        ) AS requestby,

        /* ===================================================
           Person Complaint
        =================================================== */

        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX))
          + N' / ' +
          CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons

      FROM ${DB_NAME}.dbo.Complaints com

      LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
        ON com1.reportid = com.reportid

      LEFT JOIN ${DB_NAME}.dbo.ComplaintResponse cr
        ON cr.reportid = com.reportid

      OUTER APPLY (

        SELECT

          STRING_AGG(
            d.name,
            ', '
          ) AS deptrelate_name

        FROM OPENJSON(com.deptrelate) j

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

        /* Complaints */

        com.id,
        com.reportid,
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,

        com.suggestion,
        com.type,

        com.occurrencedate,
com.reportlocation,
        com.formstatus,

        com.level, com.level2,
        com.description,
        com.effectremark,

        com.createby,
        com.createAt,
        com.updateby,
        com.updateAt,

        /* RiskManagement */

        com1.incidentType,
        com1.severity,
        com1.attn,

        com1.deptrelate,

        com1.problem,
        com1.date,

        com1.reviewReason,
        com1.reviewOther,

        com1.managementremark,

        com1.createby,
        com1.createAt,

        com1.updateby,
        com1.updateAt,
  com.pct,
        com1.deleteAt,

        /* ComplaintResponse */

        cr.summary_causes,
        cr.summary_reply,
        cr.summary_analysis,
        cr.summary_solving,
        cr.summary_organization,
        cr.analysis_team,

        cr.createby,
        cr.createAt,

        cr.updateby,
        cr.updateAt,

        cr.deleteAt,

        /* Department */

        dept.deptrelate_name,

        /* User */

        u.title,
        u.name,
        u.lastname

      ORDER BY

         com.updateAt DESC,
        com.createAt DESC
    
    `;

    console.log("======================================");
    console.log("getCenter3 PAYLOAD");
    console.log(payload);

    console.log("getCenter3 REPLACEMENTS");
    console.log(replacements);

    console.log("getCenter3 WHERE");
    console.log(whereClause);

    console.log("======================================");

    return await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

  } catch (err) {

    console.error("getCenter3 error:", err);

    if (err.parent?.errors) {
      err.parent.errors.forEach((e, i) => {
        console.error("SQL ERROR", i, e.message);
      });
    }

    return [];
  }
};


/* =========================================================
   GET CENTER 4
   risk = 3
   SummaryComplaint
========================================================= */

const getCenter4 = async (payload = {}) => {

  try {

    const {
      formStatus,
      reportNo,
      hn,
      startDate,
      endDate,
      patientType,
      severity,
      status,
    } = payload;

    let whereClause = `
      WHERE 1=1
      AND com.risk >= '2'
    `;

    const replacements = {};

    /* =====================================================
       FORM STATUS
    ===================================================== */

    if (formStatus) {

      whereClause += `
        AND com.formstatus != :formStatus
      `;

      replacements.formStatus = formStatus;
    }

    /* =====================================================
       REPORT NO
    ===================================================== */

    if (reportNo) {

      whereClause += `
        AND com.reportid LIKE :reportNo
      `;

      replacements.reportNo = `%${reportNo}%`;
    }

    /* =====================================================
       HN
    ===================================================== */

    if (hn) {

      whereClause += `
        AND com.hn LIKE :hn
      `;

      replacements.hn = `%${hn}%`;
    }

    /* =====================================================
       DATE
    ===================================================== */

    if (startDate) {

      whereClause += `
        AND CAST(com.occurrencedate AS DATE) >= :startDate
      `;

      replacements.startDate = startDate;
    }

    if (endDate) {

      whereClause += `
        AND CAST(com.occurrencedate AS DATE) <= :endDate
      `;

      replacements.endDate = endDate;
    }

    /* =====================================================
       PATIENT TYPE
    ===================================================== */

    if (patientType) {

      whereClause += `
        AND com.type = :patientType
      `;

      replacements.patientType = patientType;
    }

    /* =====================================================
       SEVERITY
    ===================================================== */

      if (severity) {
      whereClause += `
        AND com.reporttype = :severity
      `;

      replacements.severity = severity;
    }

      if (status) {
      whereClause += `
        AND com.risk = :status
      `;

      replacements.status = status;
    }
    /* =====================================================
       SQL
    ===================================================== */

    const sql = `

      SELECT

        /* ===================================================
           Complaints
        =================================================== */

        com.id,
        com.reportid,
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,
   com.reportlocation,
        com.suggestion,
        com.type,

        com.occurrencedate,

        com.formstatus,

        com.level, com.level2,
        com.description,
        com.effectremark,
  com.pct,
        com.createby,
        com.createAt,
        com.updateby,
        com.updateAt,

        /* ===================================================
           RiskManagement
        =================================================== */

        com1.incidentType,
        com1.severity,
        com1.attn,

        com1.deptrelate AS risk_deptrelate,

        com1.problem,
        com1.date AS risk_date,

        com1.reviewReason,
        com1.reviewOther,

        com1.managementremark AS risk_managementremark,

        com1.createby AS risk_createby,
        com1.createAt AS risk_createAt,

        com1.updateby AS risk_updateby,
        com1.updateAt AS risk_updateAt,

        com1.deleteAt AS risk_deleteAt,

        /* ===================================================
           ComplaintResponse
        =================================================== */

        cr.summary_causes,
        cr.summary_reply,
        cr.summary_analysis,
        cr.summary_solving,
        cr.summary_organization,
        cr.analysis_team,

        cr.createby AS response_createby,
        cr.createAt AS response_createAt,

        cr.updateby AS response_updateby,
        cr.updateAt AS response_updateAt,

        cr.deleteAt AS response_deleteAt,

        /* ===================================================
           SummaryComplaint
        =================================================== */

        sc.summary_Suggestions,

        sc.incidentType AS summary_incidentType,

        sc.createby AS summary_createby,
        sc.createAt AS summary_createAt,

        sc.updateby AS summary_updateby,
        sc.updateAt AS summary_updateAt,

        sc.deleteAt AS summary_deleteAt,

        /* ===================================================
           Department
        =================================================== */

        dept.deptrelate_name AS deptrelate,

        /* ===================================================
           User
        =================================================== */

        CONCAT(
          u.name,
          ' ',
          u.lastname
        ) AS requestby,

        /* ===================================================
           Person Complaint
        =================================================== */

        STRING_AGG(
          CAST(dep.name AS NVARCHAR(MAX))
          + N' / ' +
          CAST(p.name AS NVARCHAR(MAX)),
          N', '
        ) AS all_persons

      FROM ${DB_NAME}.dbo.Complaints com

      LEFT JOIN ${DB_NAME}.dbo.RiskManagement com1
        ON com1.reportid = com.reportid

      LEFT JOIN ${DB_NAME}.dbo.ComplaintResponse cr
        ON cr.reportid = com.reportid

      LEFT JOIN ${DB_NAME}.dbo.SummaryComplaint sc
        ON sc.reportid = com.reportid

      OUTER APPLY (

        SELECT

          STRING_AGG(
            d.name,
            ', '
          ) AS deptrelate_name

        FROM OPENJSON(com.deptrelate) j

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

        /* ===================================================
           Complaints
        =================================================== */

        com.id,
        com.reportid,
        com.risk,

        com.hn,
        com.an,
        com.age,
        com.gender,
        com.dx,

        com.suggestion,
        com.type,
  com.pct,
        com.occurrencedate,
com.reportlocation,
        com.formstatus,

        com.level, com.level2,
        com.description,
        com.effectremark,

        com.createby,
        com.createAt,
        com.updateby,
        com.updateAt,

        /* ===================================================
           RiskManagement
        =================================================== */

        com1.incidentType,
        com1.severity,
        com1.attn,

        com1.deptrelate,

        com1.problem,
        com1.date,

        com1.reviewReason,
        com1.reviewOther,

        com1.managementremark,

        com1.createby,
        com1.createAt,

        com1.updateby,
        com1.updateAt,

        com1.deleteAt,

        /* ===================================================
           ComplaintResponse
        =================================================== */

        cr.summary_causes,
        cr.summary_reply,
        cr.summary_analysis,
        cr.summary_solving,
        cr.summary_organization,
        cr.analysis_team,

        cr.createby,
        cr.createAt,

        cr.updateby,
        cr.updateAt,

        cr.deleteAt,

        /* ===================================================
           SummaryComplaint
        =================================================== */

        sc.summary_Suggestions,
        sc.incidentType,

        sc.createby,
        sc.createAt,

        sc.updateby,
        sc.updateAt,

        sc.deleteAt,

        /* ===================================================
           Department
        =================================================== */

        dept.deptrelate_name,

        /* ===================================================
           User
        =================================================== */

        u.title,
        u.name,
        u.lastname

      order by     com.createAt DESC,
    com.updateAt DESC

    `;

    return await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements,
    });

  } catch (err) {

    console.error("getCenter4 error:", err);

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


/* =========================================================
   GET MENU COUNT
========================================================= */

const getMenuCount = async (payload = {}) => {

  try {

    const {
      createby,
      dep,
      userDepID,
      userAffID,
      userLevel,
    } = payload;

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

    let responsePermission = "";

    /* =====================================================
       LEVEL 1
    ===================================================== */

    if (Number(userLevel) === 1) {

      if (hasDepID && hasDepName) {

        responsePermission = `

          AND (

            EXISTS (

              SELECT 1

              FROM OPENJSON(com.deptrelate) j

              WHERE TRY_CAST(j.value AS INT) = :userDepID

            )

            OR

            EXISTS (

              SELECT 1

              FROM OPENJSON(com.deptrelate) j

              INNER JOIN ${DB_NAME}.dbo.department d2
                ON d2.id = TRY_CAST(j.value AS INT)

              WHERE d2.name LIKE :dep

            )

          )

        `;

        replacements.userDepID =
          Number(userDepID);

        replacements.dep =
          `%${dep.trim()}%`;

      }

      else if (hasDepID) {

        responsePermission = `

          AND EXISTS (

            SELECT 1

            FROM OPENJSON(com.deptrelate) j

            WHERE TRY_CAST(j.value AS INT) = :userDepID

          )

        `;

        replacements.userDepID =
          Number(userDepID);

      }

      else if (hasDepName) {

        responsePermission = `

          AND EXISTS (

            SELECT 1

            FROM OPENJSON(com.deptrelate) j

            INNER JOIN ${DB_NAME}.dbo.department d2
              ON d2.id = TRY_CAST(j.value AS INT)

            WHERE d2.name LIKE :dep

          )

        `;

        replacements.dep =
          `%${dep.trim()}%`;

      }

      else {

        responsePermission = `
          AND 1 = 0
        `;
      }
    }

    /* =====================================================
       LEVEL 2
    ===================================================== */

    else if (Number(userLevel) === 2) {

      responsePermission = `

        AND EXISTS (

          SELECT 1

          FROM OPENJSON(com.deptrelate) j

          INNER JOIN ${DB_NAME}.dbo.department d2
            ON d2.id = TRY_CAST(j.value AS INT)

          WHERE d2.relateid = :userAffID

        )

      `;
    }

    /* =====================================================
       SQL
    ===================================================== */

    const sql = `

      SELECT

      /* ===================================================
         COMPLAINT
         risk = 0
      =================================================== */

      (

        SELECT COUNT(*)

        FROM ${DB_NAME}.dbo.Complaints com

        LEFT JOIN ${DB_NAME}.dbo.[user] u
          ON u.userid = com.createby

        WHERE com.formstatus != '3'

        AND com.risk >= '0'

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


      /* ===================================================
         ADMIN
         risk = 0
      =================================================== */

      (

        SELECT COUNT(DISTINCT com.id)

        FROM ${DB_NAME}.dbo.Complaints com

        WHERE com.formstatus != '3'

        AND com.risk >= '0'

      ) AS admin,


      /* ===================================================
         RESPONSE
         risk = 1
      =================================================== */

      (

        SELECT COUNT(DISTINCT com.id)

        FROM ${DB_NAME}.dbo.Complaints com

        INNER JOIN ${DB_NAME}.dbo.RiskManagement com1
          ON com1.reportid = com.reportid

        WHERE com.formstatus != '3'

        AND com.risk >= '1'

        AND EXISTS (

          SELECT 1

          FROM OPENJSON(com.deptrelate) j

          WHERE TRY_CAST(j.value AS INT) IS NOT NULL

        )

        ${responsePermission}

      ) AS response,


      /* ===================================================
         SUMMARY
         risk = 3
      =================================================== */

      (

        SELECT COUNT(DISTINCT com.id)

        FROM ${DB_NAME}.dbo.Complaints com

        INNER JOIN ${DB_NAME}.dbo.RiskManagement com1
          ON com1.reportid = com.reportid

        INNER JOIN ${DB_NAME}.dbo.ComplaintResponse cr
          ON cr.reportid = com.reportid

        INNER JOIN ${DB_NAME}.dbo.SummaryComplaint sc
          ON sc.reportid = com.reportid

        WHERE com.formstatus != '3'

        AND com.risk >= '2'

      ) AS summary

    `;

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


/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  getCenter1,
  getCenter2,
  getCenter3,
  getCenter4,
  getMenuCount,
};