const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: String,
  totalBeds: Number,
  occupiedBeds: Number
});

module.exports = mongoose.model("Room", roomSchema);
