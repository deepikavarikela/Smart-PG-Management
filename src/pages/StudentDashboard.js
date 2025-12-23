import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeeStatus from "../components/FeeStatus";
import ComplaintForm from "../components/ComplaintForm";
import MyComplaints from "../components/MyComplaints";

/* SOCKET CONNECTION */
const socket = io("http://localhost:5000");

const StudentDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [notifications, setNotifications] = useState([]);

  /* ================= SOCKET SETUP ================= */
  useEffect(() => {
    // ⚠️ MUST MATCH studentName used while submitting complaint
    const studentName = "deepika";

    socket.emit("join", studentName);
    console.log("✅ Joined socket room:", studentName);

    socket.on("notification", (data) => {
      console.log("🔔 Notification received:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  /* ================= CONTENT SWITCH ================= */
  const renderContent = () => {
    switch (active) {
      case "Room":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold text-indigo-600 mb-2">
              Room Details
            </h3>
            <p><b>Room Number:</b> 203</p>
            <p><b>Sharing:</b> 3 Members</p>
          </div>
        );

      case "Fees":
        return <FeeStatus />;

      case "Complaints":
        return (
          <div className="grid grid-cols-2 gap-6">
            <ComplaintForm />
            <MyComplaints />
          </div>
        );

      default: // Dashboard
        return (
          <div className="grid grid-cols-2 gap-6">
            <FeeStatus />
            <MyComplaints />
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar
        items={["Dashboard", "Room", "Fees", "Complaints"]}
        active={active}
        setActive={setActive}
      />

      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* 🔔 NOTIFICATION PASSED TO NAVBAR */}
        <Navbar
          title="Student Dashboard"
          notifications={notifications}
        />

        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
