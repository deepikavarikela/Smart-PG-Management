const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

/* STUDENT: RAISE COMPLAINT */
router.post("/", async (req, res) => {
  try {
    const { studentName, issue } = req.body;

    if (!studentName || !issue) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const complaint = new Complaint({
      studentName: studentName.trim().toLowerCase(),
      issue: issue.trim(),
      status: "Pending",
    });

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error("Complaint save error:", err);
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

/* ADMIN: GET ALL */
router.get("/", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

/* ADMIN: UPDATE STATUS + NOTIFY STUDENT */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const io = req.app.get("io");
    const room = updated.studentName.trim().toLowerCase();

    console.log("🔔 Notification sent to:", room);

    io.to(room).emit("notification", {
      message: `Your complaint is ${updated.status}`,
      issue: updated.issue,
      status: updated.status,
      time: new Date().toLocaleTimeString(),
    });

    res.json(updated);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
