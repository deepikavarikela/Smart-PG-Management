const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Student = require("../models/Student");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_1DP5mmOlF5G5ag",
  key_secret: "test_secret_dummy_12345",
});

/* ================= CREATE ORDER ================= */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "pg_fee_receipt",
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ================= VERIFY PAYMENT ================= */
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      studentId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", "YOUR_RAZORPAY_SECRET")
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Mark fee as PAID
    await Student.findByIdAndUpdate(studentId, {
      feeStatus: "Paid",
    });

    res.json({ message: "Payment verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports = router;
