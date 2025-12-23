const express = require("express");
const cors = require("cors");
const passport = require("passport");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

require("./config/passport");

const app = express();
connectDB();

/* ===== MIDDLEWARE ===== */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

/* ===== ROUTES ===== */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/room", require("./routes/roomRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));

/* ===== SOCKET SERVER ===== */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("join", (studentName) => {
    const room = studentName.toLowerCase();
    socket.join(room);
    console.log(`👤 Student joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* MAKE IO AVAILABLE IN ROUTES */
app.set("io", io);

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
