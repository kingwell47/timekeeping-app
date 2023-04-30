const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const overtimeSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    nightHours: {
      type: Number,
      required: true,
    },
    timeIn: {
      type: String,
      required: true,
    },
    timeOut: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
  timesheet: {
    type: [timesheetSchema],
    required: true,
    default: [],
  },
  leaves: {
    type: [leaveSchema],
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
