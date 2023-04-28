const express = require("express");
const router = express.Router();

const {
  getMyTimesheet,
  getMySchedule,
  getEmployeeTimesheet,
  getEmployeeSchedule,
  updateEmployeeDetails,
  updateSchedule,
  getEmployeeList,
  clockInOut,
} = require("../controllers/employeeController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getEmployeeList);
router.route("/me/timesheet").get(protect, getMyTimesheet);
router.route("/me/schedule").get(protect, getMySchedule);
router.route("/clock").post(protect, clockInOut);
router.route("/:id").put(protect, updateEmployeeDetails);
router.route("/:id/timesheet").get(protect, getEmployeeTimesheet);
router
  .route("/:id/schedule")
  .get(protect, getEmployeeSchedule)
  .put(protect, updateSchedule);

module.exports = router;
