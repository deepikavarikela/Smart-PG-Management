import { useState } from "react";
import API from "../services/api";

const AddStudent = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    roomNo: "",
    feeStatus: "Pending",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/student", student);
      alert("Student added successfully");

      setStudent({
        name: "",
        phone: "",
        roomNo: "",
        feeStatus: "Pending",
      });

      onStudentAdded();
    } catch (err) {
      alert("Failed to add student");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-bold text-indigo-600 mb-4">
        Add Student
      </h3>

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Student Name"
        value={student.name}
        onChange={(e) =>
          setStudent({ ...student, name: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Phone Number"
        value={student.phone}
        onChange={(e) =>
          setStudent({ ...student, phone: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Room Number"
        value={student.roomNo}
        onChange={(e) =>
          setStudent({ ...student, roomNo: e.target.value })
        }
      />

      <select
        className="border p-2 w-full mb-4 rounded"
        value={student.feeStatus}
        onChange={(e) =>
          setStudent({ ...student, feeStatus: e.target.value })
        }
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      </select>

      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add Student
      </button>
    </div>
  );
};

export default AddStudent;
