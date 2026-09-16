const express = require("express");
const router = express.Router();
const riskManagementController = require("../../controllers/riskManagementController");
const multer = require('multer');
const path = require('path');
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// Set up multer storage for file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, process.env.DB_STORE));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Create a new complaint
router.post("/", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'), riskManagementController.createComplaint);

router.post("/updateComplaint", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'), riskManagementController.updateComplaint);


// Get all complaints
// router.get('/', riskManagementController.getAllComplaints);

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), riskManagementController.getAllComplaints)
  .put(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), riskManagementController.updateComplaint);

// Get a single complaint by ID
router.get("/:reportid", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), riskManagementController.getComplaintById);

// Update an complaint by ID
// router.put('/:id', verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),  riskManagementController.updateComplaint);

// Delete an complaint by ID
router.delete("/:id", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), riskManagementController.deleteComplaint);
router.post("/updatereply", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'),  riskManagementController.updateReply);
router.post("/submitmanager", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'),  riskManagementController.submitManager);
router.post("/submitExecutive", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'),  riskManagementController.submitExecutive);

module.exports = router;
