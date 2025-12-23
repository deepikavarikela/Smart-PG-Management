import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddRoom from "../components/AddRoom";
import RoomList from "../components/RoomList";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";
import ComplaintList from "../components/ComplaintList";
import DashboardStats from "../components/DashboardStats";
import DashboardCharts from "../components/DashboardCharts";

const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [students, setStudents] = useState([]);

  // ✅ SAFE INITIAL STATES
  const [stats, setStats] = useState({
    vacantBeds: 0,
    totalStudents: 0,
    complaints: 0,
    paid: 0,
  });

  const [chartData, setChartData] = useState({
    joinedLeft: [],
    fees: [],
  });

  /* ================= LOAD DASHBOARD DATA ================= */
  const loadDashboard = async () => {
    try {
      const roomsRes = await API.get("/room");
      const studentsRes = await API.get("/student");
      const complaintsRes = await API.get("/complaints"); // ✅ FIXED

      const rooms = roomsRes.data || [];
      const studentsData = studentsRes.data || [];
      const complaints = complaintsRes.data || [];

      setStudents(studentsData);

      const totalBeds = rooms.reduce(
        (sum, r) => sum + Number(r.totalBeds || 0),
        0
      );

      const occupiedBeds = rooms.reduce(
        (sum, r) => sum + Number(r.occupiedBeds || 0),
        0
      );

      const paidCount = studentsData.filter(
        (s) => s.feeStatus === "Paid"
      ).length;

      setStats({
        vacantBeds: totalBeds - occupiedBeds,
        totalStudents: studentsData.length,
        complaints: complaints.length,
        paid: paidCount,
      });

      setChartData({
        joinedLeft: [
          { month: "Jan", joined: 20, left: 5 },
          { month: "Feb", joined: 15, left: 3 },
          { month: "Mar", joined: 25, left: 8 },
        ],
        fees: [
          { name: "Paid", value: paidCount },
          {
            name: "Unpaid",
            value: studentsData.length - paidCount,
          },
        ],
      });
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ================= CONTENT SWITCH ================= */
  const renderContent = () => {
    switch (active) {
      case "Rooms":
        return (
          <>
            <AddRoom />
            <RoomList />
          </>
        );

      case "Students":
        return (
          <>
            <AddStudent onStudentAdded={loadDashboard} />
            <StudentList students={students} />
          </>
        );

      case "Complaints":
        return <ComplaintList />;

      case "Fees":
        return (
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-lg font-bold text-indigo-600">
              Fees Module (Coming Soon)
            </h3>
          </div>
        );

      default: // DASHBOARD
        return (
          <>
            <DashboardStats stats={stats} />
            <DashboardCharts data={chartData} />
          </>
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar
        items={["Dashboard", "Rooms", "Students", "Fees", "Complaints"]}
        active={active}
        setActive={setActive}
      />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar title="Admin Dashboard" />
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
