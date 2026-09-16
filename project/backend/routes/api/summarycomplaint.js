const express = require("express");
const router = express.Router();
const SummaryComplaintController = require("../../controllers/SummaryComplaintController");
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
router.post("/", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'), SummaryComplaintController.createComplaint);

// Get all complaints
// router.get('/', SummaryComplaintController.getAllComplaints);

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), SummaryComplaintController.getAllComplaints)
  .put(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), upload.array('files'), SummaryComplaintController.updateComplaint);

// Get a single complaint by ID
router.get("/:id", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), SummaryComplaintController.getComplaintById);

router.get("/getComplainant/:id", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), SummaryComplaintController.getComplainantById);

// Update an complaint by ID
// router.put('/:id', verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),  SummaryComplaintController.updateComplaint);

// Delete an complaint by ID
router.delete("/:id", verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), SummaryComplaintController.deleteComplaint);

module.exports = router;
