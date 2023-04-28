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
  if (req.user.role !== "admin" && req.user.role !== "hr") {
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
  if (req.user.role !== "admin" && req.user.role !== "hr") {
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

// Update employee details
const updateEmployeeDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Get the employee associated with the currently authenticated user
  const employee = await Employee.findOne({ _id: id, user: req.user._id });

  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
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

// Get employee list
const getEmployeeList = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "hr") {
    res.status(403);
    throw new Error("User not authorized");
  }

  const employees = await Employee.find().populate("user", "name email");

  res.status(200).json(employees);
});

// Clock

module.exports = {
  getMyTimesheet,
  getEmployeeTimesheet,
  createEmployee,
  updateEmployeeDetails,
  getEmployeeList,
};
