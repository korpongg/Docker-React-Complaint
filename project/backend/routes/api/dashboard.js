
const express = require("express");

const router = express.Router();

const DashboardController = require("../../controllers/DashboardController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");


router.get(
  "/risk",
  DashboardController.getRiskDashboard
);

module.exports = router;
