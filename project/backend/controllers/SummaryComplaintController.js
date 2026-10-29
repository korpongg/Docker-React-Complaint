const sequelize = require("../config/dbConn").sequelize;
const SummaryComplaint = require("../models/SummaryComplaint");
const complaints = require("../models/Complaints");
const personcomplaint = require("../models/PersonComplaint");
const Department = require("../models/Department");
// const User = require("../models/User");
const { executeAndStoreQueryResult } = require('../services/broadcastService');
const { sendEmail, sendExecEmail } = require("./emailController");
const DB_NAME = process.env.DB_NAME;
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


const {array,createby,appeal} = req.body
const data = JSON.parse(array);

const currentYear = new Date().getFullYear().toString().slice(-2); // Extract last two digits of the year
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0"); // Get current month and ensure it's zero-padded
    const fullYear = new Date().getFullYear().toString();
    // Find the last job detail entry for the current month
    const lastReport = await SummaryComplaint.findOne({
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
      department:data[i].department.id,
      faction:data[i].faction,
      createby:createby,
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
        updateAt: sequelize.literal("CURRENT_TIMESTAMP"),
      reportid: reportId, // Assign the generated reportId
    });
}

    const fileData = req.files || [];

    // Get the current year and month
    
    const complaintDate = new Date(req.body.complaintdate);
    const formattedComplaintDate = complaintDate.toISOString().replace('T', ' ').replace('Z', '');

    const result = await SummaryComplaint.create({
      ...req.body,
      complaintdate: sequelize.literal(`'${formattedComplaintDate}'`),
      formstatus: req.body.formstatus ? req.body.formstatus : "1",
      createAt: sequelize.literal("CURRENT_TIMESTAMP"),
       updateAt: sequelize.literal("CURRENT_TIMESTAMP"),
      reportid: reportId, // Assign the generated reportId
    });


    if (fileData.length > 0) {
      const renamePromises = fileData.map((file) => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        const newFilename = `OCC${reportId}${fileExt}`;
        const oldPath = file.path;
        const newPath = path.join(__dirname, process.env.DB_STORE2, newFilename);
   
        
        return new Promise((resolve, reject) => {
          fs.rename(oldPath, newPath, async (err) => {
            if (err) {
              reject(err);
            } else {
              const newBuildPath = path.join(__dirname, process.env.DB_STORE2_BUILD, newFilename);
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
  
  const result3= await complaints.update({ 
    risk: '3'
  },{
      where: { reportid: reportId  }
    });

    executeAndStoreQueryResult();
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


exports.getAllComplaints = async (req, res) => {
  try {

    const occQuery = `
      SELECT com.*
       FROM ${DB_NAME}.[dbo].[SummaryComplaint] com
      
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

// Get a single complaint by ID
exports.getComplaintById = async (req, res) => {

 if (!req?.params?.id) {
    return res.status(400).json({ message: "id is required." });
  }

  const reportid = req?.params?.id;

  try {
 
   const occQuery = `
  SELECT TOP 1 com.*
  FROM ${DB_NAME}.[dbo].[SummaryComplaint] com
  WHERE com.reportid = :reportid
  ORDER BY com.id DESC;
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

    const occQuery = `
      SELECT per.*
        FROM ${DB_NAME}.[dbo].[person_complaint] per
    
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
    return res.status(400).json({
      message: "id is required."
    });
  }

  try {

    const id = req.body.id;

    const complaint = await SummaryComplaint.findOne({
      where: { id }
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    const updateData = {};

    Object.keys(req.body).forEach((key) => {

      let value = req.body[key];

      // FormData ส่ง array มา
      if (Array.isArray(value)) {
        value = value[0];
      }

      // ไม่ update null / undefined
      if (value !== undefined && value !== null) {
        updateData[key] = value;
      }

    });

    // ⭐ อัปเดต updatedAt ของ SummaryComplaint
    updateData.updateAt = sequelize.literal("CURRENT_TIMESTAMP");

    await complaint.update(updateData);

    const result = await SummaryComplaint.findOne({
      where: { id }
    });

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }
};
// Delete an complaint by ID
exports.deleteComplaint = async (req, res) => {
  const Id = req?.params?.id;
  if (!Id) return res.status(400).json({ message: "Occurence ID required" });

  try {
    const com = await SummaryComplaint.findOne({ where: { id: Id, deleteAt: null } });
    if (!com) {
      return res.status(204).json({ message: `Occurence ID ${Id} not found` });
    }
    com.deleteAt = sequelize.fn('GETDATE');
    com.formstatus = "3";
    await com.save();
    executeAndStoreQueryResult();
    res.status(201).json({ message: `Occurence ID ${Id} deleted successfully` });
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