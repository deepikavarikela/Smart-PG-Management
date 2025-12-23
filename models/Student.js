const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  roomNo: {
    type: String,
    required: true,
  },
  feeStatus: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Student", studentSchema);
