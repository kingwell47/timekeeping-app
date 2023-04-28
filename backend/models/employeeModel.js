const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Vacation", "Sick"],
    required: true,
  },
  replacedBy: {
    type: String,
    required: true,
  },
});

const overtimeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
  },
});

const timesheetSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  timeIn: {
    type: Date,
    default: null,
  },
  timeOut: {
    type: Date,
    default: null,
  },
});

const scheduleSchema = new mongoose.Schema({
  Sunday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
  Monday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
  Tuesday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
  Wednesday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
  Thursday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
  Friday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
  Saturday: {
    In: {
      type: String,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      default: "9:00 PM",
    },
  },
});

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  currentSchedule: {
    type: scheduleSchema,
    required: true,
    default: {},
  },
  totalVacationLeaves: {
    type: Number,
    required: true,
    default: 7,
  },
  vacationLeavesUsed: {
    type: Number,
    required: true,
    default: 0,
  },
  remainingVacationLeaves: {
    type: Number,
    default: function () {
      return this.totalVacationLeaves - this.vacationLeavesUsed;
    },
  },
  totalSickLeaves: {
    type: Number,
    required: true,
    default: 7,
  },
  sickLeavesUsed: {
    type: Number,
    required: true,
    default: 0,
  },
  remainingSickLeaves: {
    type: Number,
    default: function () {
      return this.totalVacationLeaves - this.vacationLeavesUsed;
    },
  },
  timesheet: {
    type: [timesheetSchema],
    required: true,
    default: [],
  },
  leaves: {
    type: [leaveSchema], // Modify this line
    required: true,
    default: [],
  },
  overtime: {
    type: [overtimeSchema],
    required: true,
    default: [],
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
const Timesheet = mongoose.model("Timesheet", timesheetSchema);

module.exports = { Employee, Timesheet };
