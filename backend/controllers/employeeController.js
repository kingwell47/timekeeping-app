const asyncHandler = require("express-async-handler");

const { Employee, Timesheet } = require("../models/employeeModel");

// Get timesheet for the current employee
const getMyTimesheet = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }
  const timesheet = employee.timesheet;
  res.status(200).json(timesheet);
});

// Get schedule for current employee
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

// Get timesheet for any employee
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

// Get schedule for any employee
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

// Update employee details
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

  res
    .status(200)
    .json({
      message: "Schedule updated successfully",
      currentSchedule: employee.currentSchedule,
    });
});

// Get employee list
const getEmployeeList = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  const employees = await Employee.find().populate("user", "name email");

  res.status(200).json(employees);
});

// Clock in/out

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

module.exports = {
  getMyTimesheet,
  getMySchedule,
  getEmployeeTimesheet,
  getEmployeeSchedule,
  updateEmployeeDetails,
  updateSchedule,
  getEmployeeList,
  clockInOut,
};
