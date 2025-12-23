import { useEffect, useState } from "react";
import API from "../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // ✅ CORRECT API ENDPOINT
        const res = await API.get("/student");
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load students");
        setStudents([]); // prevent crash
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-bold text-purple-600 mb-4">
        Students
      </h3>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      {/* EMPTY STATE */}
      {students.length === 0 && !error && (
        <p className="text-gray-500">No students found</p>
      )}

      {/* STUDENT LIST */}
      {students.map((s) => (
        <div key={s._id} className="border p-3 rounded mb-2">
          <p><b>Name:</b> {s.name}</p>
          <p><b>Room:</b> {s.roomNo || "Not Assigned"}</p>
          <p className="text-orange-600">
            <b>Fee:</b> {s.feeStatus || "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
