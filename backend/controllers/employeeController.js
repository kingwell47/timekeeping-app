const asyncHandler = require("express-async-handler");

const { Employee, Timesheet } = require("../models/employeeModel");

// @desc Get timesheet for the current employee
// @route GET api/employees/me/timesheet
// @access Private
const getMyTimesheet = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }
  const timesheet = employee.timesheet;
  res.status(200).json(timesheet);
});

// @desc Get schedule for the current employee
// @route GET api/employees/me/schedule
// @access Private
const getMySchedule = asyncHandler(async (req, res) => {
  // Find the employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Return the employee's schedule
  res.status(200).json(employee.currentSchedule);
});

// @desc Get timesheet for the any employee
// @route GET api/employees/:id/timesheet
// @access Private
const getEmployeeTimesheet = asyncHandler(async (req, res) => {
  // Check if user is an HR user

  if (req.user.role !== "hr") {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Find the employee by ID
  const employee = await Employee.findById(req.params.id).populate("user");
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Return the employee's timesheet
  res.status(200).json(employee.timesheet);
});

// @desc Get schedule for any employee
// @route GET api/employees/:id/schedule
// @access Private
const getEmployeeSchedule = asyncHandler(async (req, res) => {
  // Check if user is an HR user
  if (req.user.role !== "hr") {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Find the employee by ID
  const employee = await Employee.findById(req.params.id).populate("user");
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Return the employee's timesheet
  res.status(200).json(employee.currentSchedule);
});

// @desc Update employee details
// @route PUT api/employees/:id
// @access Private
const updateEmployeeDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Get the employee associated with the currently authenticated user
  const employee = await Employee.findOne({ _id: id, user: req.user._id });

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  //Check if current user is authorized
  if (req.user.role !== "admin" && req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  Object.assign(employee, updateFields);
  await employee.save();
  res.status(200).json(employee);
});

// @desc Update employee schedule
// @route PUT api/employees/:id/schedule
// @access Private
const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedSchedule = req.body;

  const employee = await Employee.findById(id);

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  // Check if user is authorized
  if (req.user.role !== "admin" && req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  // Update the employee's schedule
  employee.currentSchedule = updatedSchedule;
  await employee.save();

  res.status(200).json({
    message: "Schedule updated successfully",
    currentSchedule: employee.currentSchedule,
  });
});

// @desc Get employee list
// @route GET api/employees/
// @access Private
const getEmployeeList = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  const employees = await Employee.find()
    .populate("user", "name email")
    .select("_id name currentSchedule vacationLeavesUsed sickLeavesUsed");

  res.status(200).json(employees);
});

// @desc Clock in or Out
// @route POST api/employees/clock
// @access Private
const clockInOut = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  let timesheet = employee.timesheet.find((ts) => ts.date === currentDate);

  if (timesheet && timesheet.timeIn && !timesheet.timeOut) {
    // If the employee has an existing timesheet for the current date with no clock-out time, update it with the current time as the clock-out time
    timesheet.timeOut = new Date();
    await employee.save();
    res.status(200).json({ message: "Clocked out successfully" });
  } else if (timesheet && timesheet.timeIn && timesheet.timeOut) {
    // If the employee has an existing timesheet for the current date with both clock-in and clock-out time, return an error
    res.status(400).json({
      message:
        "You have already clocked in and out today. Please contact your supervisor if you need to adjust your timesheet.",
    });
  } else if (timesheet && timesheet.timeIn && !timesheet.timeOut) {
    // If the employee has an existing timesheet for the current date with a clock-in time and no clock-out time, they are still logged in
    res.status(400).json({
      message:
        "You are already clocked in. Please clock out before attempting to clock in again.",
    });
  } else {
    // If the employee does not have an existing timesheet for the current date, create a new timesheet record with the current time as the clock-in time
    timesheet = new Timesheet({
      timeIn: new Date(),
      date: currentDate,
    });
    employee.timesheet.push(timesheet);
    await employee.save();
    res.status(200).json({ message: "Clocked in successfully" });
  }
});

// @desc Add a leave
// @route POST api/employees/me/leaves
// @access Private
const addLeave = asyncHandler(async (req, res) => {
  const { type, date, replacedBy } = req.body;
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  if (!type || !date || !replacedBy) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  let leaveUsed = 0;
  if (type === "Vacation") {
    leaveUsed = 1;
    employee.vacationLeavesUsed += 1;
  } else if (type === "Sick") {
    leaveUsed = 1;
    employee.sickLeavesUsed += 1;
  }

  const leave = {
    type,
    date,
    replacedBy,
  };

  employee.leaves.push(leave);
  await employee.save();

  res.status(200).json({
    message: "Leave added successfully",
    leave,
  });
});

// @desc Get Employee Clocked in Status
// @route GET api/employees/clock
// @access Private
const getEmployeeClockedInStatus = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) {
    throw new Error("Employee not found");
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const timesheet = employee.timesheet.find((ts) => ts.date === currentDate);

  const clockedInStatus = !!(
    timesheet &&
    timesheet.timeIn &&
    !timesheet.timeOut
  );

  res
    .status(200)
    .json({ clockedIn: clockedInStatus, timeIn: timesheet.timeIn });
});

// @desc Add overtime
// @route POST api/employees/me/overtime
// @access Private
const addOvertime = asyncHandler(async (req, res) => {
  const { date, hours, nightHours, timeIn, timeOut, reason } = req.body;

  const employee = await Employee.findOne({ user: req.user._id });

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  if (!date || !hours || !nightHours || !timeIn || !timeOut || !reason) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const overtime = {
    date,
    hours,
    nightHours,
    timeIn,
    timeOut,
    reason,
  };

  employee.overtime.push(overtime);
  await employee.save();

  res.status(200).json({
    message: "Overtime added successfully",
    overtime,
  });
});

// @desc get leaves array
// @route GET api/employees/me/leaves
// @access Private
const getLeaves = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id }).populate(
    "leaves"
  );

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  res.status(200).json(employee.leaves);
});

// @desc get overtime array
// @route GET api/employees/me/overtime
// @access Private
const getOvertime = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id }).populate(
    "overtime"
  );

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  res.status(200).json(employee.overtime);
});

// @desc get current employee data
// @route GET api/employees/me/
// @access Private
const getEmployeeData = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id })
    .populate({
      path: "leaves",
      options: { sort: { date: -1 } },
    })
    .populate({
      path: "overtime",
      options: { sort: { date: -1 } },
    });

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  const { name, position, currentSchedule, leaves, overtime, timesheet } =
    employee;

  res.status(200).json({
    name,
    position,
    currentSchedule,
    leaves,
    overtime,
    timesheet,
  });
});

module.exports = {
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
};
