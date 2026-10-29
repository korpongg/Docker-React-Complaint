const sequelize = require("../config/dbConn").sequelize;
const RiskManagement = require("../models/RiskManagement");
const complaints = require("../models/Complaints");
const ComplaintResponse = require("../models/ComplaintResponse");
const SummaryComplaint = require("../models/SummaryComplaint");

const Department = require("../models/Department");
// const User = require("../models/User");

const MAIL_MAP = {
  manager: {
    a: ["sakulrhatnuttawut@gmail.com"],
    b: ["justtechcomseicnt@gmail.com"],
  },
  quality: {
    a: ["justtechcomseicnt@gmail.com"],
    b: ["justtechcomseicnt@gmail.com"],
  },
  nurse: {
    a: ["justtechcomseicnt@gmail.com"],
    b: ["justtechcomseicnt@gmail.com"],
    c: ["justtechcomseicnt@gmail.com"],
  },
  administer: {
    a: ["korpongparunyakul@gmail.com"],
    b: ["korpongparunyakul@gmail.com"],
    c: ["korpongparunyakul@gmail.com"],
    d: ["korpongparunyakul@gmail.com"],
    e: ["korpongparunyakul@gmail.com"],
  },
  operation: {
    a: ["justtechcomseicnt@gmail.com"],
    b: ["justtechcomseicnt@gmail.com"],
    c: ["justtechcomseicnt@gmail.com"],
    d: ["justtechcomseicnt@gmail.com"],
  },
  director: {
    a: ["korpongparunyakul@gmail.com"],
  },
  doctor: {
    a: ["justtechcomseicnt@gmail.com"],
    b: ["justtechcomseicnt@gmail.com"],
  },
  compensation: {
    a: ["korpongparunyakul@gmail.com"],
  },
};
const normalizeResponseDueDate = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const dateString = String(value).trim();

  // รับเฉพาะรูปแบบ YYYY-MM-DD จาก input type="date"
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    throw new Error("responseDueDate ต้องอยู่ในรูปแบบ YYYY-MM-DD");
  }

  const [, year, month, day] = match;
  const check = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  );

  if (
    check.getUTCFullYear() !== Number(year) ||
    check.getUTCMonth() !== Number(month) - 1 ||
    check.getUTCDate() !== Number(day)
  ) {
    throw new Error("responseDueDate ไม่ใช่วันที่ที่ถูกต้อง");
  }

  // คืนเป็น string ห้ามแปลงเป็น new Date()
  return dateString;
};
function buildMailList(data) {
  const mails = [];

  Object.entries(data).forEach(([role, value]) => {
    if (!MAIL_MAP[role] || !value) return;

    // แยกกรณีหลายค่า c,d,b
    const codes = value.split(",");

    codes.forEach((code) => {
      const emailList = MAIL_MAP[role][code];
      if (emailList) {
        mails.push(...emailList);
      }
    });
  });

  // กัน email ซ้ำ
  return [...new Set(mails)];
}

const { executeAndStoreQueryResult } = require("../services/broadcastService");
const { sendEmail, sendExecEmail } = require("./emailController");
const DB_NAME = process.env.DB_NAME;
const HA_EMAIL = process.env.HA_EMAIL;
const normalizeComplainant = (value) => {
  if (value === undefined || value === null || value === "") {
    return value;
  }

  const values = Array.isArray(value)
    ? value
    : String(value).split(",");

  const allowedValues = ["0", "1", "2", "3", "4"];

  return [
    ...new Set(
      values
        .map((item) => String(item).trim())
        .filter((item) => allowedValues.includes(item))
    ),
  ].join(",");
};
const fs = require("fs");
const path = require("path");

// Utility function to format date to dd/mm/yyyy hh:mm:ss
// const formatDateTime_N7 = (date) => {
//   if (!date) return null;
//     const d = new Date(date);

//     const day = d.getUTCDate();
//     const month = d.getUTCMonth() + 1;
//     const year = d.getUTCFullYear();
//     const hours = d.getUTCHours();
//     const minutes = d.getUTCMinutes();
//     const seconds = d.getUTCSeconds();

//     // Pad single-digit day, month, hours, minutes, and seconds with leading zeros
//     const formattedDay = day < 10 ? `0${day}` : `${day}`;
//     const formattedMonth = month < 10 ? `0${month}` : `${month}`;
//     const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//     const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

//     return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// }

const formatDateTime_N7 = (date) => {
  if (!date) return null;

  let d;

  // If it's a Sequelize literal object, extract the value
  if (typeof date === "object" && date.val) {
    d = new Date(date.val.replace(/^'|'$/g, "")); // Remove quotes if present
  } else {
    d = new Date(date);
  }

  if (isNaN(d.getTime())) return null; // Ensure it's a valid date

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const {
      count,
      deptemail,
      count2,
      deptemail2,
      reportidWhere,
      manager,
      quality,
    } = req.body;


    const roleData = {
      manager: req.body.manager,
      quality: req.body.quality,
      nurse: req.body.nurse,
      administer: req.body.administer,
      operation: req.body.operation,
      director: req.body.director,
      doctor: req.body.doctor,
      compensation: req.body.compensation,
    };


    var arr_mail = [];
    if (typeof deptemail !== "undefined" && deptemail !== null) {
      arr_mail = JSON.parse(deptemail);
    }
    var arr_mail2 = [];
    if (typeof deptemail2 !== "undefined" && deptemail2 !== null) {
      arr_mail2 = JSON.parse(deptemail2);
    }

    const fileData = req.files || [];


    // Get the current year and month
    const currentYear = new Date().getFullYear().toString().slice(-2); // Extract last two digits of the year
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0"); // Get current month and ensure it's zero-padded
    const fullYear = new Date().getFullYear().toString();
    // Find the last job detail entry for the current month
    const lastReport = await RiskManagement.findOne({
      attributes: [
        [
          sequelize.literal(
            'MAX(CAST(SUBSTRING("reportid", 1, 3) AS integer))',
          ),
          "lastReportId",
        ],
        "createAt", // Add createAt to the attributes
      ],
      where: sequelize.literal(
        `YEAR("createAt") = '${fullYear}' AND MONTH("createAt") = '${currentMonth}'`,
      ),
      group: ["createAt"],
      order: [[sequelize.literal("createAt"), "DESC"]], // Order by createAt column
    });
    let lastReportId = "001"; // Default reportid if no previous entry found for the month
    const lastID = lastReport?.dataValues.lastReportId || "";

    if (lastReport && lastID != "") {
      // Increment lastReportId by 1
      lastReportId = (parseInt(lastID) + 1).toString().padStart(3, "0");
    }
  
    const reportId = lastReportId + currentMonth + currentYear;
   
    const complaintDate = new Date(req.body.complaintdate);
  
    const formattedComplaintDate = complaintDate
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
const result = await RiskManagement.create({
  ...req.body,

  complainant: normalizeComplainant(req.body.complainant),
  responseDueDate: normalizeResponseDueDate(req.body.responseDueDate),

  complaintdate: sequelize.literal(`'${formattedComplaintDate}'`),
  formstatus: req.body.formstatus ? req.body.formstatus : "1",
  createAt: sequelize.literal("CURRENT_TIMESTAMP"),
  updateAt: sequelize.literal("CURRENT_TIMESTAMP"),
  reportid: reportidWhere,
});

    if (fileData.length > 0) {
      const renamePromises = fileData.map((file) => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        const newFilename = `OCC${reportId}${fileExt}`;
        const oldPath = file.path;
        const newPath = path.join(
          __dirname,
          process.env.DB_STORE2,
          newFilename,
        );

        return new Promise((resolve, reject) => {
          fs.rename(oldPath, newPath, async (err) => {
            if (err) {
              reject(err);
            } else {
              const newBuildPath = path.join(
                __dirname,
                process.env.DB_STORE2_BUILD,
                newFilename,
              );
              fs.copyFile(newPath, newBuildPath, (copyErr) => {
                if (copyErr) reject(copyErr);
                else resolve(newFilename);
              });
            }
          });
        });
      });
      result.image = await Promise.all(renamePromises);
      await result.save();
    }
    // Send email

const mailList = buildMailList(roleData);


for (const recipientEmail of mailList) {
  const newComplaintId = result.id;

  const emailSubject =
    "แจ้งรายงานข้อร้องเรียน เลขที่เอกสาร: " + reportidWhere;

  const emailMessage = `
    เรียน หน่วยงานที่เกี่ยวข้อง<br/><br/>

    ขอแจ้งให้ทราบว่า ระบบได้บันทึกรายงานข้อร้องเรียนเรียบร้อยแล้ว<br/><br/>

    เลขที่เอกสาร: <b>${reportidWhere}</b><br/>
    สถานะปัจจุบัน: รอตรวจสอบ<br/><br/>

    จึงเรียนมาเพื่อโปรดพิจารณาตรวจสอบรายละเอียด
    และดำเนินการในส่วนที่เกี่ยวข้อง<br/><br/>

    ขอขอบคุณ
  `;

  console.log("กำลังส่งเมลไป:", recipientEmail);

  try {
    await sendEmail(
      recipientEmail,
      newComplaintId,
      reportidWhere,
      emailSubject,
      emailMessage
    );

    console.log("ส่งเมลสำเร็จ:", recipientEmail);
  } catch (emailError) {
    console.error("ส่งเมลไม่สำเร็จ:", recipientEmail, emailError);
  }
}

    for (var i = 0; i < count; i++) {
      const newComplaintId = result.id;
      const emailSubject =
        "แจ้งรายงานข้อร้องเรียน เลขที่เอกสาร: " + reportidWhere;
      const emailMessage = `
        เรียน ผู้เกี่ยวข้อง<br/><br/>

        ระบบได้ทำการสร้างรายงานข้อร้องเรียนเรียบร้อยแล้ว<br/><br/>

        เลขที่เอกสาร: ${reportidWhere}<br/><br/>

        สถานะปัจจุบัน: รอตรวจสอบ<br/><br/>

        กรุณาเข้าสู่ระบบเพื่อตรวจสอบรายละเอียดและดำเนินการตามขั้นตอนต่อไป<br/><br/>

        ขอขอบคุณ
        `;
      const recipientEmail = arr_mail[i];
     sendEmail(
        recipientEmail,
        newComplaintId,
        reportidWhere,
        emailSubject,
        emailMessage,
      );
    }

    for (var i = 0; i < count2; i++) {
      const newComplaintId = result.id;

      const emailSubject =
                "แจ้งเพื่อทราบ: รายงานข้อร้องเรียน เลขที่เอกสาร " + reportidWhere;

              const emailMessage = `
        เรียน ผู้เกี่ยวข้อง<br/><br/>

        ขอแจ้งเพื่อทราบว่า ระบบได้ทำการสร้างรายงานข้อร้องเรียนเรียบร้อยแล้ว<br/><br/>

        เลขที่เอกสาร: <b>${reportidWhere}</b><br/><br/>
        สถานะปัจจุบัน: รอตรวจสอบ<br/><br/>

        อีเมลฉบับนี้จัดส่งเพื่อแจ้งข้อมูลให้ทราบเท่านั้น<br/><br/>

        `;
      const recipientEmail = arr_mail2[i];
      sendEmail(
        recipientEmail,
        newComplaintId,
        reportidWhere,
        emailSubject,
        emailMessage,
      );
    }
 
    const result3 = await complaints.update(
      {
        risk: "1",
      },
      {
        where: { reportid: reportidWhere },
      },
    );
 
    executeAndStoreQueryResult();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.submitExecutive = async (req, res) => {
  try {
    const { reportidWhere } = req.body;
    const result = await SummaryComplaint.create({
      ...req.body,
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
      formstatus: req.body.formstatus ? req.body.formstatus : "1",

      reportid: reportidWhere, // Assign the generated reportId
    });

    const result3 = await complaints.update(
      {
        risk: "3",
      },
      {
        where: { reportid: reportidWhere },
      },
    );
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.submitManager = async (req, res) => {
  try {
    const { reportidWhere } = req.body;

    const result = await ComplaintResponse.create({
      ...req.body,
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
      formstatus: req.body.formstatus ? req.body.formstatus : "1",

      reportid: reportidWhere, // Assign the generated reportId
    });

    const result3 = await complaints.update(
      {
        reply: "1",
        risk: "2",
      },
      {
        where: { reportid: reportidWhere },
      },
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReply = async (req, res) => {
  try {
    const { reportidWhere } = req.body;

    const result = await complaints.update(req.body, {
      where: { reportid: reportidWhere },
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    // First query to get complaints and user details
    const occQuery = `
      SELECT com.*,
        CONCAT(u_request.title, ' ', u_request.name, ' ', u_request.lastname) AS requestby,
        u_request.dep AS requestdep,
        u_request.faction AS requestfac,
        u_request.affiliation AS requestaff,
        CASE
          WHEN u_update.userid IS NULL THEN NULL
          ELSE CONCAT(u_update.title, ' ', u_update.name, ' ', u_update.lastname)
        END AS updateby,
        u_update.dep AS updatedep,
        u_update.faction AS updatefac,
        u_update.affiliation AS updateaff,
        CASE 
          WHEN u_accept.userid IS NULL THEN NULL
          ELSE CONCAT(u_accept.title, ' ', u_accept.name, ' ', u_accept.lastname)
        END AS acceptby,
        u_accept.dep AS acceptdep,
        u_accept.faction AS acceptfac,
        u_accept.affiliation AS acceptaff,
        CASE WHEN com.reporttype = '0' THEN 'General Risk' ELSE 'Clinical Risk' END AS reporttypename
      FROM ${DB_NAME}.[dbo].[RiskManagement] com
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_request ON u_request.userid = com.createby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_update ON u_update.userid = com.updateby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_accept ON u_accept.userid = com.acceptby
      ORDER BY 
        CASE 
          WHEN com.formstatus = '1' THEN 1
          WHEN com.formstatus = '2' THEN 2
          WHEN com.formstatus = '4' THEN 3
          WHEN com.formstatus = '0' THEN 4
          WHEN com.formstatus = '5' THEN 5
          WHEN com.formstatus = '3' THEN 6
          ELSE 6 
        END;
    `;

    const results = await sequelize.query(occQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length > 0) {
      // Fetch department and affiliation data using raw query
      const deptAffData = await sequelize.query(
        `SELECT d.id, d.name AS DepName, a.id AS AffID, a.name AS AffName
         FROM ${DB_NAME}.[dbo].[department] d
         LEFT JOIN ${DB_NAME}.[dbo].[affiliation] a ON a.id = d.relateid`,
        { type: sequelize.QueryTypes.SELECT },
      );

      // Use map to parse JSON fields before sending the response
      const parsedResults = results.map((complaint) => {
        let deptRelateIds = [];

        try {
          // Parse deptrelate field assuming it's a JSON array of strings
          deptRelateIds = JSON.parse(complaint.deptrelate || "[]").map((id) =>
            parseInt(id, 10),
          );
        } catch (e) {
          // Handle parsing error if any
          console.error("Error parsing deptrelate:", e);
        }

        // Map deptRelateIds to department and affiliation data
        const deptAffInfo = deptRelateIds.map((id) => {
          return deptAffData.find((dept) => dept.id === id) || {};
        });

        return {
          ...complaint,
          deptrelate: JSON.parse(complaint.deptrelate || "[]"),
          deptrelate2: JSON.parse(complaint.deptrelate2 || "[]"),
          patientcare: JSON.parse(complaint.patientcare || "[]"),
          patientsupport: JSON.parse(complaint.patientsupport || "[]"),
          utility: JSON.parse(complaint.utility || "[]"),
          equipment: JSON.parse(complaint.equipment || "[]"),
          safety: JSON.parse(complaint.safety || "[]"),
          service: JSON.parse(complaint.service || "[]"),
          management: JSON.parse(complaint.management || "[]"),
          deptAffInfo,
        };
      });

      return res.status(200).json(parsedResults);
    } else {
      return res.status(404).json({ error: "Complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single complaint by ID
exports.getComplaintById = async (req, res) => {
  if (!req?.params?.reportid) {
    return res.status(400).json({ message: "id is required." });
  }

  const reportid = req?.params?.reportid;
  try {
    // First query to get complaints and user details
    const occQuery = `
      SELECT com.*,
        CONCAT(u_request.title, ' ', u_request.name, ' ', u_request.lastname) AS requestby,
        u_request.dep AS requestdep,
        u_request.faction AS requestfac,
        u_request.affiliation AS requestaff,
        CASE
          WHEN u_update.userid IS NULL THEN NULL
          ELSE CONCAT(u_update.title, ' ', u_update.name, ' ', u_update.lastname)
        END AS updateby,
        u_update.dep AS updatedep,
        u_update.faction AS updatefac,
        u_update.affiliation AS updateaff,
        CASE 
          WHEN u_accept.userid IS NULL THEN NULL
          ELSE CONCAT(u_accept.title, ' ', u_accept.name, ' ', u_accept.lastname)
        END AS acceptby,
        u_accept.dep AS acceptdep,
        u_accept.faction AS acceptfac,
        u_accept.affiliation AS acceptaff,
        CASE WHEN com.reporttype = '0' THEN 'General Risk' ELSE 'Clinical Risk' END AS reporttypename
      FROM ${DB_NAME}.[dbo].[RiskManagement] com
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_request ON u_request.userid = com.createby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_update ON u_update.userid = com.updateby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_accept ON u_accept.userid = com.acceptby
      WHERE com.reportid = :reportid;
    `;

    const results = await sequelize.query(occQuery, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { reportid },
    });

    if (results.length > 0) {
      // Fetch department and affiliation data using raw query
      const deptAffData = await sequelize.query(
        `SELECT d.id, d.name AS DepName, a.id AS AffID, a.name AS AffName
         FROM ${DB_NAME}.[dbo].[department] d
         LEFT JOIN ${DB_NAME}.[dbo].[affiliation] a ON a.id = d.relateid`,
        { type: sequelize.QueryTypes.SELECT },
      );

      // Use map to parse JSON fields before sending the response
      const parsedResults = results.map((complaint) => {
        let deptRelateIds = [];

        try {
          // Parse deptrelate field assuming it's a JSON array of strings
          deptRelateIds = JSON.parse(complaint.deptrelate || "[]").map((id) =>
            parseInt(id, 10),
          );
        } catch (e) {
          // Handle parsing error if any
          console.error("Error parsing deptrelate:", e);
        }

        // Map deptRelateIds to department and affiliation data
        const deptAffInfo = deptRelateIds.map((id) => {
          return deptAffData.find((dept) => dept.id === id) || {};
        });

        const deptRelate2Ids = JSON.parse(complaint.deptrelate2 || "[]").map(
          (id) => parseInt(id, 10),
        );

        const deptAffInfo2 = deptRelate2Ids.map((id) => {
          return deptAffData.find((dept) => dept.id === id) || {};
        });
        return {
          ...complaint,
          deptrelate: JSON.parse(complaint.deptrelate || "[]"),
          deptrelate2: JSON.parse(complaint.deptrelate2 || "[]"),
          patientcare: JSON.parse(complaint.patientcare || "[]"),
          patientsupport: JSON.parse(complaint.patientsupport || "[]"),
          utility: JSON.parse(complaint.utility || "[]"),
          equipment: JSON.parse(complaint.equipment || "[]"),
          safety: JSON.parse(complaint.safety || "[]"),
          service: JSON.parse(complaint.service || "[]"),
          management: JSON.parse(complaint.management || "[]"),
          deptAffInfo,
          deptAffInfo2,
        };
      });

      return res.status(200).json(parsedResults[0]);
    } else {
      return res.status(404).json({ error: "Complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an complaint by ID
exports.updateComplaint = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "id is required." });
  }
  
  const {
    count,
    deptemail,
    count2,
    deptemail2,
    reportidWhere,
    manager,
    quality,
  } = req.body;
  var arr_mail = [];

  const roleData = {
    manager: req.body.manager,
    quality: req.body.quality,
    nurse: req.body.nurse,
    administer: req.body.administer,
    operation: req.body.operation,
    director: req.body.director,
    doctor: req.body.doctor,
    compensation: req.body.compensation,
  };
  const mailList = buildMailList(roleData);

  console.log("MAIL LIST Update:", mailList);

  if (typeof deptemail !== "undefined" && deptemail !== null) {
    arr_mail = JSON.parse(deptemail);
  }
  var arr_mail2 = [];
  if (typeof deptemail2 !== "undefined" && deptemail2 !== null) {
    arr_mail2 = JSON.parse(deptemail2);
  }

  const id = req?.body?.id;
  try {
    const fileData = req.files;
    const complaint = await RiskManagement.findOne({ where: { id: id } });
    // const [updated] = await Complaints.update(req.body, {
    //   where: { id: req.params.id },
    // });
    if (!complaint) {
      return res
        .status(204)
        .json({ message: `No RiskManagement matches ID ${req.body.id}.` });
    }
    // Check if req.body.complaintdate is provided and parse it
    if (req.body.complaintdate) {
      const complaintdate = new Date(req.body.complaintdate);
      const formattedComplaintDate = complaintdate
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");
      req.body.complaintdate = sequelize.literal(`'${formattedComplaintDate}'`);
    }
    if (req.body.acceptdate) {
      const acceptdate = new Date(req.body.acceptdate);
      const formattedAcceptDate = acceptdate
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");
      req.body.acceptdate = sequelize.literal(`'${formattedAcceptDate}'`);
    }
    if (req.body.responsedate) {
      const responsedate = new Date(req.body.responsedate);
      const formattedResponseDate = responsedate
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");
      req.body.responsedate = sequelize.literal(`'${formattedResponseDate}'`);
    }

    if (req.body.updateby) {
      req.body.updateAt = sequelize.literal("CURRENT_TIMESTAMP");
    }
if (req.body.complainant !== undefined) {
  req.body.complainant = normalizeComplainant(
    req.body.complainant
  );
}

if (req.body.responseDueDate !== undefined) {
  req.body.responseDueDate = normalizeResponseDueDate(
    req.body.responseDueDate
  );
}
    const validColumns = req.body;
    // console.log("Data sets:", validColumns);

    // Loop through validColumns and update or remove values as needed
    for (const column in validColumns) {
    if (
  validColumns[column] === undefined ||
  validColumns[column] === "Invalid date"
) {
  // ไม่ส่งค่ามา หรือเป็นวันที่ไม่ถูกต้อง ให้คงข้อมูลเดิมไว้
  continue;
}

complaint[column] = validColumns[column];
    }
    complaint.updateAt = sequelize.literal("CURRENT_TIMESTAMP");

    // Additional logging to trace the flow
    // console.log("Before saving Complaints:");
    // console.log(complaint.toJSON());

    const result = await complaint.save();

    if (fileData && fileData.length > 0) {
      const imgExtensions = [".jpg", ".jpeg", ".png"];
      const docExtensions = [
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
      ];
      let hasImageFile = false;
      let hasDocFile = false;

      fileData.forEach((file) => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (imgExtensions.includes(fileExt)) hasImageFile = true;
        if (docExtensions.includes(fileExt)) hasDocFile = true;
      });

      if (hasImageFile || hasDocFile) {
        // Delete existing files before saving new ones
        if (hasImageFile) {
          imgExtensions.forEach((ext) => {
            const existingFilePath = path.join(
              __dirname,
              process.env.DB_STORE2,
              `OCC${req.body.reportid}${ext}`,
            );
            if (fs.existsSync(existingFilePath)) {
              fs.unlinkSync(existingFilePath);
            }
          });
        }

        if (hasDocFile) {
          docExtensions.forEach((ext) => {
            const existingFilePath = path.join(
              __dirname,
              process.env.DB_STORE2,
              `OCC${req.body.reportid}${ext}`,
            );
            if (fs.existsSync(existingFilePath)) {
              fs.unlinkSync(existingFilePath);
            }
          });
        }
        // Process file renaming and saving
        const renamePromises = fileData.map((file) => {
          const fileExt = path.extname(file.originalname).toLowerCase();
          const newFilename = `OCC${req.body.reportid}${fileExt}`;
          const oldPath = file.path;
          const newPath = path.join(
            __dirname,
            process.env.DB_STORE2,
            newFilename,
          );

          return new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, async (err) => {
              if (err) reject(err);
              else {
                const newBuildPath = path.join(
                  __dirname,
                  process.env.DB_STORE2_BUILD,
                  newFilename,
                );
                fs.copyFile(newPath, newBuildPath, (copyErr) => {
                  if (copyErr) reject(copyErr);
                  else resolve(newFilename);
                });
              }
            });
          });
        });

        result.image = await Promise.all(renamePromises);
        await result.save();
      }
    }

    // Determine if email should be sent based on level and reporttype
    const isGeneralRisk = result.reporttype === "0";
    const levelCheck = isGeneralRisk
      ? parseInt(result.level, 10) > 3
      : ["E", "F", "G", "H", "I"].includes(result.level);

    // Send email
    for (var i = 0; i < mailList.length; i++) {
      const newComplaintId = result.id;
      const emailSubject = "แจ้งเพื่อทราบ เลขที่เอกสาร: " + complaint.reportid;
      const emailMessage =
        "เลขที่เอกสาร: " +
        complaint.reportid +
        `<br/><br/>` +
        "สร้างรายงานสำเร็จ รอตรวจสอบ";
      const recipientEmail = mailList[i];
      sendEmail(
        recipientEmail,
        newComplaintId,
        complaint.reportid,
        emailSubject,
        emailMessage,
      );
    }

    for (var i = 0; i < count; i++) {
      const newComplaintId = result.id;
      const emailSubject = "ข้อร้องเรียน เลขที่เอกสาร: " + complaint.reportid;
      const emailMessage =
        "เลขที่เอกสาร: " +
        complaint.reportid +
        `<br/><br/>` +
        "สร้างรายงานสำเร็จ รอตรวจสอบ";
      const recipientEmail = arr_mail[i];
     sendEmail(
        recipientEmail,
        newComplaintId,
        complaint.reportid,
        emailSubject,
        emailMessage,
      );
    }

    for (var i = 0; i < count2; i++) {
      const newComplaintId = result.id;
      const emailSubject = "ข้อร้องเรียน เลขที่เอกสาร: " + complaint.reportid;
      const emailMessage =
        "เลขที่เอกสาร: " +
        complaint.reportid +
        `<br/><br/>` +
        "สร้างรายงานสำเร็จ รอตรวจสอบ";
      const recipientEmail = arr_mail2[i];
     sendEmail(
        recipientEmail,
        newComplaintId,
        complaint.reportid,
        emailSubject,
        emailMessage,
      );
    }
    if (complaint.acceptby === null && req.body.renew) {
      complaint.acceptby = "1";
      const resAccept = await complaint.save();

      if (resAccept) {
        let depArr = resAccept.deptrelate;
        if (typeof depArr === "string") {
          depArr = JSON.parse(depArr);
        }

        // Fetch relateid from the department table based on depArr values
        const departments = await Department.findAll({
          where: { id: depArr },
          attributes: ["relateid", "name"],
        });

        // Group departments by relateid
        const departmentGroups = {};
        departments.forEach((item) => {
          const { relateid, name } = item.dataValues;
          if (!departmentGroups[relateid]) {
            departmentGroups[relateid] = [];
          }
          departmentGroups[relateid].push(name);
        });

        // Map relateids to corresponding email recipients
        const emailCC = [];
        const departmentList = [];
        Object.keys(departmentGroups).forEach((relateid) => {
          const names = departmentGroups[relateid].join(", ");
          departmentList.push(`${names}`);
          if (levelCheck) {
            switch (parseInt(relateid)) {
              case 1:
                emailCC.push("korpongparunyakul@gmail.com");
                break;
              case 2:
                emailCC.push("korpongparunyakul@gmail.com");
                break;
              case 3:
                emailCC.push("korpongparunyakul@gmail.com");
                break;
              case 5:
                emailCC.push("korpongparunyakul@gmail.com");
                break;
              case 6:
                emailCC.push("korpongparunyakul@gmail.com");
                break;
              default:
                break;
            }
          }
        });
        const reportId = resAccept.reportid;
        // Join department list with a line break or comma, as preferred
        const formatDepList = departmentList.join(", ");
        const renewDesc = resAccept.renew.replace(/\n/g, "<br/>");
        const impromptDesc = resAccept.impromptusolution.replace(
          /\n/g,
          "<br/>",
        );

        const emailSubject = "ข้อร้องเรียน เลขที่เอกสาร: " + reportId;
        const emailMessage = `<div style="font-size: 18px;">
          <p style="font-size: 20px;">เรียนผู้บริหารรับทราบ ข้อร้องเรียนระดับความเสี่ยงสูง</p><br/>
          <strong>รายละเอียดข้อร้องเรียน</strong><br/>
          1. วันที่เกิดเหตุ: ${formatDateTime_N7(resAccept.complaintdate)}<br/><br/>
          2. ประเภท: ${resAccept.reporttype === "0" ? "General Risk" : "Clinical Risk"}<br/><br/>
          3. ระดับความรุนแรง: ${resAccept.level}<br/><br/>
          4. หน่วยงานที่เกี่ยวข้อง: ${formatDepList} <br/><br/>
          5. สรุปเหตุการณ์:<br/> ${renewDesc}<br/><br/>
          6. การแก้ไขปัญหาเฉพาะหน้า:<br/> ${impromptDesc ? impromptDesc : "-"}</div>
        `;
        const recipientEmail = "korpongparunyakul@gmail.com";
        // const recipientEmail = HA_EMAIL;
        sendExecEmail(recipientEmail, emailCC, id, emailSubject, emailMessage);
      }
    }
    const result3 = await complaints.update(
      {
        risk: "1",
        reply: null,
      },
      {
        where: { reportid: complaint.reportid },
      },
    );
    executeAndStoreQueryResult();

    // Additional logging after saving
    // console.log("After saving Complaints:");
    // console.log(result.toJSON());

    // const updatedComplaint = await Complaints.findByPk(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// exports.updateComplaints = async (req, res) => {
//   try {
//     const [updated] = await Complaints.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!updated) {
//       return res.status(404).json({ error: "Complaint not found" });
//     }
//     const updatedComplaint = await Complaints.findByPk(req.params.id);
//     res.status(200).json(updatedComplaint);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Delete an complaint by ID
exports.deleteComplaint = async (req, res) => {
  const Id = req?.params?.id;
  if (!Id) return res.status(400).json({ message: "Occurence ID required" });

  try {
    const com = await RiskManagement.findOne({
      where: { id: Id, deleteAt: null },
    });
    if (!com) {
      return res.status(204).json({ message: `Occurence ID ${Id} not found` });
    }
    com.deleteAt = sequelize.fn("GETDATE");
    com.formstatus = "3";
    await com.save();
    executeAndStoreQueryResult();
    res
      .status(201)
      .json({ message: `Occurence ID ${Id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateRisk = async (req, res) => {
  try {
    const { id } = req.params;
const { risk, remark } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "ไม่พบ reportid",
      });
    }

    if (![3, 4].includes(Number(risk))) {
      return res.status(400).json({
        message: "ค่า risk ต้องเป็น 3 หรือ 4 เท่านั้น",
      });
    }

    const [updated] = await complaints.update(
      {
        risk: String(risk),
        remark:remark,
      },
      {
        where: {
          reportid: id,
        },
      },
    );

    if (updated === 0) {
      return res.status(404).json({
        message: `ไม่พบข้อมูล Complaints ของ reportid ${id}`,
      });
    }

    executeAndStoreQueryResult();

    return res.status(200).json({
      message: "อัปเดต Risk สำเร็จ",
      reportid: id,
      risk: Number(risk),
    });

  } catch (error) {
    console.error("updateRisk Error:", error);

    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในการอัปเดต Risk",
      error: error.message,
    });
  }
};