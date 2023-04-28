const express = require("express");
const router = express.Router();

const {
  getMyTimesheet,
  getEmployeeTimesheet,
  createEmployee,
  updateTimesheet,
  updateSchedule,
} = require("../controllers/employeeController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(createEmployee);
router.route("/me").get(protect, getMyTimesheet);
router.route("/:id").put(updateTimesheet).get(getEmployeeTimesheet);

module.exports = router;
