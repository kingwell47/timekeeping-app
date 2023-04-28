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
} = require("../controllers/employeeController");

// Importing the protect middleware from the authMiddleware module
const { protect } = require("../middleware/authMiddleware");

// Defining the API routes and the corresponding functions
router.route("/").get(protect, getEmployeeList);
router.route("/me/timesheet").get(protect, getMyTimesheet);
router.route("/me/schedule").get(protect, getMySchedule);
router.route("/me/leaves").post(protect, addLeave);
router.route("/clock").post(protect, clockInOut);
router.route("/:id").put(protect, updateEmployeeDetails);
router.route("/:id/timesheet").get(protect, getEmployeeTimesheet);
router
  .route("/:id/schedule")
  .get(protect, getEmployeeSchedule)
  .put(protect, updateSchedule);

module.exports = router;
