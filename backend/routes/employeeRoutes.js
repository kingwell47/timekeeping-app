const express = require("express");
const router = express.Router();

const {
  getMyTimesheet,
  getEmployeeTimesheet,
  updateEmployeeDetails,

  getEmployeeList,
} = require("../controllers/employeeController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getEmployeeList);
router.route("/me/timesheet").get(protect, getMyTimesheet);
router.route("/:id").put(protect, updateEmployeeDetails);
router.route("/:id/timesheet").get(getEmployeeTimesheet);

module.exports = router;
