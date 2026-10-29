const sequelize = require("../config/dbConn").sequelize;
const Complaints = require("../models/Complaints");
const personcomplaint = require("../models/PersonComplaint");
const Department = require("../models/Department");
// const User = require("../models/User");
const { executeAndStoreQueryResult } = require('../services/broadcastService');
const { sendEmail, sendExecEmail } = require("./emailController");
const DB_NAME = process.env.DB_NAME;
const DB_NAME_HN = process.env.HIS_SERVER;

const HA_EMAIL = process.env.HA_EMAIL;

const fs = require('fs');
const path = require('path');

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
  if (typeof date === 'object' && date.val) {
    d = new Date(date.val.replace(/^'|'$/g, '')); // Remove quotes if present
  } else {
    d = new Date(date);
  }

  if (isNaN(d.getTime())) return null; // Ensure it's a valid date

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {

const {array,createby,appeal,time} = req.body

const formattedTime =
  typeof time === 'string'
    ? time
    : null;

const data = JSON.parse(array);

const currentYear = new Date().getFullYear().toString().slice(-2); // Extract last two digits of the year
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0"); // Get current month and ensure it's zero-padded
    const fullYear = new Date().getFullYear().toString();
    // Find the last job detail entry for the current month
    const lastReport = await Complaints.findOne({
      attributes: [
        [
          sequelize.literal(
            'MAX(CAST(SUBSTRING("reportid", 1, 3) AS integer))'
          ),
          "lastReportId",
        ],
        "createAt", // Add createAt to the attributes
      ],
      where: sequelize.literal(
        `YEAR("createAt") = '${fullYear}' AND MONTH("createAt") = '${currentMonth}'`
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
    // Concatenate year and month to form the reportid
    const reportId = lastReportId + currentMonth + currentYear;
   if(appeal==1)
for(var i=0;i<data.length;i++){

const result2 = await personcomplaint.create({
  
      number:data[i].id,
      name:data[i].name,
      department:data[i].department,
      faction:data[i].faction,
      createby:createby,
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
      reportid: reportId, // Assign the generated reportId
    });
}

    const fileData = req.files || [];
    
    const complaintDate = new Date(req.body.complaintdate);
    const formattedComplaintDate = complaintDate.toISOString().replace('T', ' ').replace('Z', '');

    const result = await Complaints.create({
      ...req.body,
      time:formattedTime,
      complaintdate: sequelize.literal(`'${formattedComplaintDate}'`),
      formstatus: req.body.formstatus ? req.body.formstatus : "1",
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
      updateAt: sequelize.literal("CURRENT_TIMESTAMP"),
      reportid: reportId, // Assign the generated reportId
      status:1,
    });

  if (fileData.length > 0) {
  const renamePromises = fileData.map((file, index) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const newFilename = `OCC${reportId}_${index + 1}${fileExt}`;

    const oldPath = file.path;

    const newPath = path.join(
      __dirname,
      process.env.DB_STORE2,
      newFilename
    );

    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, async (err) => {
        if (err) {
          reject(err);
        } else {
          const newBuildPath = path.join(
            __dirname,
            process.env.DB_STORE2_BUILD,
            newFilename
          );

          fs.copyFile(newPath, newBuildPath, (copyErr) => {
            if (copyErr) {
              reject(copyErr);
            } else {
              resolve(newFilename);
            }
          });
        }
      });
    });
  });

  result.image = JSON.stringify(
    await Promise.all(renamePromises)
  );

  await result.save();
}

    executeAndStoreQueryResult();
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
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
      type: sequelize.QueryTypes.SELECT
    });

    if (results.length > 0) {
      // Fetch department and affiliation data using raw query
      const deptAffData = await sequelize.query(
        `SELECT d.id, d.name AS DepName, a.id AS AffID, a.name AS AffName
         FROM ${DB_NAME}.[dbo].[department] d
         LEFT JOIN ${DB_NAME}.[dbo].[affiliation] a ON a.id = d.relateid`,
        { type: sequelize.QueryTypes.SELECT }
      );

      // Use map to parse JSON fields before sending the response
      const parsedResults = results.map(complaint => {
        let deptRelateIds = [];

        try {
          // Parse deptrelate field assuming it's a JSON array of strings
          deptRelateIds = JSON.parse(complaint.deptrelate || '[]').map(id => parseInt(id, 10));
        } catch (e) {
          // Handle parsing error if any
          console.error("Error parsing deptrelate:", e);
        }

        // Map deptRelateIds to department and affiliation data
        const deptAffInfo = deptRelateIds.map(id => {
          return deptAffData.find(dept => dept.id === id) || {};
        });

        return {
          ...complaint,
          deptrelate: JSON.parse(complaint.deptrelate || '[]'),
          deptrelate2: JSON.parse(complaint.deptrelate2 || '[]'),
          patientcare: JSON.parse(complaint.patientcare || '[]'),
          patientsupport: JSON.parse(complaint.patientsupport || '[]'),
          utility: JSON.parse(complaint.utility || '[]'),
          equipment: JSON.parse(complaint.equipment || '[]'),
          safety: JSON.parse(complaint.safety || '[]'),
          service: JSON.parse(complaint.service || '[]'),
          management: JSON.parse(complaint.management || '[]'),
          deptAffInfo
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

exports.getComplaintViewFormById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "id is required." });
  }

  const reportid = req?.params?.id;

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
      FROM ${DB_NAME}.[dbo].[Complaints] com
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_request ON u_request.userid = com.createby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_update ON u_update.userid = com.updateby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_accept ON u_accept.userid = com.acceptby
      WHERE com.reportid = :reportid;
    `;

    const results = await sequelize.query(occQuery, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { reportid }
    });

    if (results.length > 0) {
      // Fetch department and affiliation data using raw query
      const deptAffData = await sequelize.query(
        `SELECT d.id, d.name AS DepName, a.id AS AffID, a.name AS AffName
         FROM ${DB_NAME}.[dbo].[department] d
         LEFT JOIN ${DB_NAME}.[dbo].[affiliation] a ON a.id = d.relateid`,
        { type: sequelize.QueryTypes.SELECT }
      );

      // Use map to parse JSON fields before sending the response
      const parsedResults = results.map(complaint => {
        let deptRelateIds = [];

        try {
          // Parse deptrelate field assuming it's a JSON array of strings
          deptRelateIds = JSON.parse(complaint.deptrelate || '[]').map(id => parseInt(id, 10));
        } catch (e) {
          // Handle parsing error if any
          console.error("Error parsing deptrelate:", e);
        }

        // Map deptRelateIds to department and affiliation data
        const deptAffInfo = deptRelateIds.map(id => {
          return deptAffData.find(dept => dept.id === id) || {};
        });

        return {
          ...complaint,
          deptrelate: JSON.parse(complaint.deptrelate || '[]'),
          deptrelate2: JSON.parse(complaint.deptrelate2 || '[]'),
          patientcare: JSON.parse(complaint.patientcare || '[]'),
          patientsupport: JSON.parse(complaint.patientsupport || '[]'),
          utility: JSON.parse(complaint.utility || '[]'),
          equipment: JSON.parse(complaint.equipment || '[]'),
          safety: JSON.parse(complaint.safety || '[]'),
          service: JSON.parse(complaint.service || '[]'),
          management: JSON.parse(complaint.management || '[]'),
          deptAffInfo
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
// Get a single complaint by ID
exports.getComplaintById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "id is required." });
  }

  const reportid = req?.params?.id;

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
      FROM ${DB_NAME}.[dbo].[Complaints] com
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_request ON u_request.userid = com.createby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_update ON u_update.userid = com.updateby
      LEFT JOIN ${DB_NAME}.[dbo].[user] AS u_accept ON u_accept.userid = com.acceptby
      WHERE com.id = :reportid;
    `;

    const results = await sequelize.query(occQuery, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { reportid }
    });

    if (results.length > 0) {
      // Fetch department and affiliation data using raw query
      const deptAffData = await sequelize.query(
        `SELECT d.id, d.name AS DepName, a.id AS AffID, a.name AS AffName
         FROM ${DB_NAME}.[dbo].[department] d
         LEFT JOIN ${DB_NAME}.[dbo].[affiliation] a ON a.id = d.relateid`,
        { type: sequelize.QueryTypes.SELECT }
      );

      // Use map to parse JSON fields before sending the response
      const parsedResults = results.map(complaint => {
        let deptRelateIds = [];

        try {
          // Parse deptrelate field assuming it's a JSON array of strings
          deptRelateIds = JSON.parse(complaint.deptrelate || '[]').map(id => parseInt(id, 10));
        } catch (e) {
          // Handle parsing error if any
          console.error("Error parsing deptrelate:", e);
        }

        // Map deptRelateIds to department and affiliation data
        const deptAffInfo = deptRelateIds.map(id => {
          return deptAffData.find(dept => dept.id === id) || {};
        });

        return {
          ...complaint,
          deptrelate: JSON.parse(complaint.deptrelate || '[]'),
          deptrelate2: JSON.parse(complaint.deptrelate2 || '[]'),
          patientcare: JSON.parse(complaint.patientcare || '[]'),
          patientsupport: JSON.parse(complaint.patientsupport || '[]'),
          utility: JSON.parse(complaint.utility || '[]'),
          equipment: JSON.parse(complaint.equipment || '[]'),
          safety: JSON.parse(complaint.safety || '[]'),
          service: JSON.parse(complaint.service || '[]'),
          management: JSON.parse(complaint.management || '[]'),
          deptAffInfo
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

exports.getComplainantById = async (req, res) => {

  if (!req?.params?.id) {
    return res.status(400).json({ message: "id is required." });
  }

  const reportid = req?.params?.id;

  try {
    // First query to get complaints and user details
  const occQuery = `
    SELECT  
      per.*, 
      dep.name AS departmentName 
    FROM ${DB_NAME}.[dbo].[person_complaint] per 
    LEFT JOIN ${DB_NAME}.[dbo].[department] dep 
      ON dep.id = TRY_CAST(per.department AS INT)
    WHERE per.reportid = :reportid;
`;

    const results = await sequelize.query(occQuery, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { reportid }
    });

return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an complaint by ID
exports.updateComplaint = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "id is required." });
  }

const {array,createby,time,reportid} = req?.body

let { appeal } = req.body


const data = JSON.parse(array);

if(data.length==0){
appeal=0;
}



const deleted = await personcomplaint.destroy({
      where: { reportid: reportid }
    });
    for(var i=0;i<data.length;i++){

const result2 = await personcomplaint.create({
  
      number:data[i].id,
      name:data[i].name,
      department:data[i].department,
      faction:data[i].faction,
      createby:createby,
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
      reportid: reportid, // Assign the generated reportId
    });
}
 



  try {
    const fileData = req.files;

    const complaint = await Complaints.findOne({ 
      where: { reportid: reportid } });


    if (!complaint) {
      return res.status(204).json({ message: `No Complaints matches ID ${req.body.id}.` });
    }
  complaint.appeal = appeal;
Object.keys(req.body).forEach(key => {
  if (req.body[key] === 'null') {
    req.body[key] = null;
  }
});

    // Check if req.body.complaintdate is provided and parse it
    if (req.body.complaintdate) {
      const complaintdate = new Date(req.body.complaintdate);
      const formattedComplaintDate = complaintdate.toISOString().replace('T', ' ').replace('Z', '');
      req.body.complaintdate = sequelize.literal(`'${formattedComplaintDate}'`);
    }
    if (req.body.acceptdate) {
      const acceptdate = new Date(req.body.acceptdate);
      const formattedAcceptDate = acceptdate.toISOString().replace('T', ' ').replace('Z', '');
      req.body.acceptdate = sequelize.literal(`'${formattedAcceptDate}'`);
    }
    if (req.body.responsedate) {
      const responsedate = new Date(req.body.responsedate);
      const formattedResponseDate = responsedate.toISOString().replace('T', ' ').replace('Z', '');
      req.body.responsedate = sequelize.literal(`'${formattedResponseDate}'`);
    }

    if (req.body.updateby) {
      req.body.updateAt = sequelize.literal("CURRENT_TIMESTAMP");
    }
complaint.set(req.body);
    const validColumns = req.body;

    // Loop through validColumns and update or remove values as needed
   

    complaint.updateAt = sequelize.literal("CURRENT_TIMESTAMP");

    // Additional logging to trace the flow

if (req.body.updateImage === "1") {

 let keepImages = [];

if(req.body.oldImages){
  keepImages = JSON.parse(req.body.oldImages);
}


let oldImages = [];

if(complaint.image){
  oldImages = JSON.parse(complaint.image);
}


// ลบเฉพาะรูปที่ไม่ได้อยู่ใน keepImages
oldImages.forEach(filename=>{

  if(!keepImages.includes(filename)){

    const oldPath = path.join(
      __dirname,
      process.env.DB_STORE2,
      filename
    );

    if(fs.existsSync(oldPath)){
      fs.unlinkSync(oldPath);
    }

  }

});


  const newImages=[];

  if(fileData && fileData.length>0){

    fileData.forEach((file,index)=>{

      const ext = path.extname(file.originalname);

      const filename =
 `COM${req.body.reportid}_${Date.now()}_${index}${ext}`

      fs.renameSync(
        file.path,
        path.join(
          __dirname,
          process.env.DB_STORE2,
          filename
        )
      );


      newImages.push(filename);

    });
  }


  complaint.image = JSON.stringify([
  ...keepImages,
  ...newImages
]);
}


let result;

try {
  result = await complaint.save();
} catch(err) {

  console.log(err);
  console.log(err.stack);
  throw err;
}

    // Determine if email should be sent based on level and reporttype
    const isGeneralRisk = result.reporttype === '0';
    const levelCheck = isGeneralRisk ? parseInt(result.level, 10) > 3 : ["E", "F", "G", "H", "I"].includes(result.level);

    // Send email
    if (req.body.formstatus === '1') {
      // Get the ID of the newly created complaint
      const reportId = result.reportid;
      const emailSubject = "ข้อร้องเรียน เลขที่เอกสาร: " + reportId;
      const emailMessage = "เลขที่เอกสาร: " + reportId + `<br/><br/>` + "สร้างรายงานสำเร็จ รอตรวจสอบ";
      const recipientEmail = HA_EMAIL;
    //  sendEmail(recipientEmail, id, emailSubject, emailMessage);
    }

    if (complaint.acceptby === null && req.body.renew) {
      complaint.acceptby = '1';
      const resAccept = await complaint.save();

      if (resAccept) {
        let depArr = resAccept.deptrelate;
        if (typeof depArr === 'string') {
          depArr = JSON.parse(depArr);
        }

        // Fetch relateid from the department table based on depArr values
        const departments = await Department.findAll({
          where: { id: depArr },
          attributes: ['relateid', 'name']
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
          const names = departmentGroups[relateid].join(', ');
          departmentList.push(`${names}`);
          if (levelCheck) {
            switch (parseInt(relateid)) {
              case 1:
                emailCC.push('paitoon.k@thainakarin.co.th');
                break;
              case 2:
                emailCC.push('watson.a@thainakarin.co.th');
                break;
              case 3:
                emailCC.push('surussavadee.s@thainakarin.co.th');
                break;
              case 5:
                emailCC.push('thipachart.p@thainakarin.co.th');
                break;
              case 6:
                emailCC.push('malee.b@thainakarin.co.th');
                break;
              default:
                break;
            }
          }
        });
        
        const reportId = resAccept.reportid;
        // Join departmlent list with a line break or comma, as preferred
        const formatDepList = departmentList.join(', ');
        const renewDesc = resAccept.renew.replace(/\n/g, '<br/>');
        const impromptDesc = resAccept.impromptusolution.replace(/\n/g, '<br/>');

        const emailSubject = "ข้อร้องเรียน เลขที่เอกสาร: " + reportId;
        const emailMessage = `<div style="font-size: 18px;">
          <p style="font-size: 20px;">เรียนผู้บริหารรับทราบ ข้อร้องเรียนระดับความเสี่ยงสูง</p><br/>
          <strong>รายละเอียดข้อร้องเรียน</strong><br/>
          1. วันที่เกิดเหตุ: ${formatDateTime_N7(resAccept.complaintdate)}<br/><br/>
          2. ประเภท: ${resAccept.reporttype === '0' ? 'General Risk' : 'Clinical Risk'}<br/><br/>
          3. ระดับความรุนแรง: ${resAccept.level}<br/><br/>
          4. หน่วยงานที่เกี่ยวข้อง: ${formatDepList} <br/><br/>
          5. สรุปเหตุการณ์:<br/> ${renewDesc}<br/><br/>
          6. การแก้ไขปัญหาเฉพาะหน้า:<br/> ${impromptDesc ? impromptDesc : '-'}</div>
        `;
        const recipientEmail = 'pattarapon.k@thainakarin.co.th';
        // const recipientEmail = HA_EMAIL;
        sendExecEmail(recipientEmail, emailCC, id, emailSubject, emailMessage);
      }
    }

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
// exports.updateComplaints = async (req, res) => {A
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

exports.updateStatus = async (req, res) => {

  const { id, status, updateby } = req.body;


  if (!id) {
    return res.status(400).json({
      message:"Complaint ID required"
    });
  }


  try {

    const com = await Complaints.findOne({
      where:{
        id:id
      }
    });


    if(!com){
      return res.status(404).json({
        message:`Complaint ID ${id} not found`
      });
    }


    // update status ใหม่
    com.status = status;
    com.updateby = updateby;
    com.updateAt = sequelize.fn("GETDATE");


    // ไม่ใช่ข้อร้องเรียน
    if(status === "0"){

      com.deleteAt = sequelize.fn("GETDATE");

    }


    // กลับมาเป็นปกติ
    if(status === "1"){

      com.deleteAt = null;

    }


    // ปิดประเด็น
    if(status === "2"){

      // ไม่ต้องแก้ formstatus
      // เพราะ status ใหม่ดูแลเรื่องนี้แล้ว

    }


    await com.save();


    executeAndStoreQueryResult();


    return res.status(200).json({
      message:"Update status success"
    });


  } catch(error){

    res.status(500).json({
      error:error.message
    });

  }

};
// Delete an complaint by ID
exports.deleteComplaint = async (req, res) => {
  const Id = req?.params?.id;

  if (!Id) return res.status(400).json({ message: "Occurence ID required" });
  try {
    const com = await Complaints.findOne({ where: { id: Id } });
    if (!com) {
      return res.status(204).json({ message: `Occurence ID ${Id} not found` });
    }
    com.deleteAt = sequelize.fn('GETDATE');
    com.formstatus = "3";
    await com.save();
await executeAndStoreQueryResult();
    res.status(201).json({ message: `Occurence ID ${Id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getHnName = async (req, res) => {

const { hn } = req.query;
  //const hn = req?.params?.hn;
  if (!hn) return res.status(400).json({ message: " HN required" });
  try {

     const occQuery = `
   SELECT TOP 1
  FirstName,
  LastName
FROM [10.1.1.117].[DNHOS].[dbo].[HNPAT_NAME]
WHERE HN =
    '`+hn+`'`;
  
    const results = await sequelize.query(occQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
       
return res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.deleteComplaint = async (req, res) => {
//   try {
//     const deleted = await Complaints.destroy({
//       where: { id: req.params.id },
//     });
//     if (!deleted) {
//       return res.status(404).json({ error: "Complaint not found" });
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };