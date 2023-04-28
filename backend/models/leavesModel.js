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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
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

const Leave = mongoose.model("Leave", leaveSchema);
const Overtime = mongoose.model("Overtime", overtimeSchema);

module.exports = { Leave, Overtime };
