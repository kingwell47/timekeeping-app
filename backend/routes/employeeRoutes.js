const express = require("express");
const router = express.Router();

// Importing the functions from the employeeController module
const {
  getMyTimesheet,
  getMySchedule,
  getEmployeeTimesheet,
  getEmployeeSchedule,
  updateEmployeeDetails,
  updateSchedule,
  getEmployeeList,
  clockInOut,
  addLeave,
  getLeaves,
  addOvertime,
  getOvertime,
  getEmployeeClockedInStatus,
  getEmployeeData,
} = require("../controllers/employeeController");

// Importing the protect middleware from the authMiddleware module
const { protect } = require("../middleware/authMiddleware");

// Defining the API routes and the corresponding functions
router.route("/").get(protect, getEmployeeList);
router.route("/me").get(protect, getEmployeeData);
router.route("/me/timesheet").get(protect, getMyTimesheet);
router.route("/me/schedule").get(protect, getMySchedule);
router.route("/me/leaves").post(protect, addLeave).get(protect, getLeaves);
router
  .route("/me/overtime")
  .post(protect, addOvertime)
  .get(protect, getOvertime);
router
  .route("/clock")
  .post(protect, clockInOut)
  .get(protect, getEmployeeClockedInStatus);
router.route("/:id").put(protect, updateEmployeeDetails);
router.route("/:id/timesheet").get(protect, getEmployeeTimesheet);
router
  .route("/:id/schedule")
  .get(protect, getEmployeeSchedule)
  .put(protect, updateSchedule);

module.exports = router;
