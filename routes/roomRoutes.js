const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

// Add room
router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Failed to add room" });
  }
});

// Get rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

module.exports = router;
