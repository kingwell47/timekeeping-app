const asyncHandler = require("express-async-handler");

const Employee = require("../models/employeeModel");

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

// Get timesheet for any employee
const getEmployeeTimesheet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id, user: req.user._id });

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  //Check if user is authorized
  if (req.user.role !== "admin" || req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  const timesheet = employee.timesheet;
  res.status(200).json(timesheet);
});

// Create Employee
const createEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    position,
    currentSchedule,
    totalVacationLeaves,
    vacationLeavesUsed,
    remainingVacationLeaves,
    totalSickLeaves,
    sickLeavesUsed,
    remainingSickLeaves,
    timesheet,
    role,
  } = req.body;
  const { _id: userId } = req.user;

  //Check if user is authorized
  if (req.user.role !== "admin" || req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  // Check if all required fields are included in the request body
  if (
    !name ||
    !position ||
    !currentSchedule ||
    !totalVacationLeaves ||
    !vacationLeavesUsed ||
    !remainingVacationLeaves ||
    !totalSickLeaves ||
    !sickLeavesUsed ||
    !remainingSickLeaves ||
    !timesheet ||
    !role
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingEmployee = await Employee.findOne({ user: userId, name });
  if (existingEmployee) {
    res.status(400);
    throw new Error("Employee already Exists");
  }

  const newEmployee = new Employee({
    user: userId,
    name,
    position,
    currentSchedule,
    totalVacationLeaves,
    vacationLeavesUsed,
    remainingVacationLeaves: totalVacationLeaves - vacationLeavesUsed,
    totalSickLeaves,
    sickLeavesUsed,
    remainingSickLeaves: totalSickLeaves - sickLeavesUsed,
    role,
  });
  await newEmployee.save();
  res.status(201).json(newEmployee);
});

const updateTimesheet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { timeIn, timeOut } = req.body;

  // Find the employee by ID
  const employee = await Employee.findOne({ _id: id, user: req.user._id });

  // If employee is not found, send 400 error
  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  // Create a new timesheet entry
  const newEntry = {
    date: new Date(),
    timeIn,
    timeOut,
  };

  // Add the new entry to the timesheet array
  employee.timesheet.push(newEntry);

  // Save the updated employee document to the database
  await employee.save();

  res.status(200).json(employee);
});

// Update employee schedule

const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentSchedule } = req.body;

  //Check if user is authorized
  if (req.user.role !== "admin" || req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  // Get the employee associated with the currently authenticated user
  const employee = await Employee.findOne({ _id: id, user: req.user._id });

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  employee.currentSchedule = currentSchedule;
  await employee.save();
  res.status(200).json(employee);
});

module.exports = {
  getMyTimesheet,
  getEmployeeTimesheet,
  createEmployee,
  updateTimesheet,
  updateSchedule,
};
