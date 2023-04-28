const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  timeIn: {
    type: String,
    required: true,
  },
  timeOut: {
    type: String,
    default: null,
  },
});

const scheduleSchema = new mongoose.Schema({
  Sunday: {
    In: {
      type: String,
      required: true,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: true,
      default: "9:00 PM",
    },
  },
  Monday: {
    In: {
      type: String,
      required: true,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: true,
      default: "9:00 PM",
    },
  },
  Tuesday: {
    In: {
      type: String,
      required: true,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: true,
      default: "9:00 PM",
    },
  },
  Wednesday: {
    In: {
      type: String,
      required: true,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: true,
      default: "9:00 PM",
    },
  },
  Thursday: {
    In: {
      type: String,
      required: false,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: false,
      default: "9:00 PM",
    },
  },
  Friday: {
    In: {
      type: String,
      required: true,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: true,
      default: "9:00 PM",
    },
  },
  Saturday: {
    In: {
      type: String,
      required: true,
      default: "9:00 AM",
    },
    Out: {
      type: String,
      required: true,
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
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
