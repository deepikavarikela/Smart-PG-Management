const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= ADD STUDENT (ADMIN) ================= */
router.post("/", async (req, res) => {
  try {
    const { name, phone, roomNo, feeStatus } = req.body;

    if (!name || !roomNo) {
      return res.status(400).json({
        message: "Name and Room are required",
      });
    }

    const student = new Student({
      name,
      phone,
      roomNo,
      feeStatus: feeStatus || "Pending",
    });

    await student.save();
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add student",
    });
  }
});

/* ================= GET ALL STUDENTS (ADMIN) ================= */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch {
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});

/* ================= GET LOGGED-IN STUDENT PROFILE ================= */
router.get("/profile/me", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to load profile",
    });
  }
});

module.exports = router;
