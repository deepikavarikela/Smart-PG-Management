import { useEffect, useState } from "react";
import API from "../services/api";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/complaints/${id}`, { status });
    loadComplaints(); // refresh
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-bold text-red-600 mb-4">
        Complaints
      </h3>

      {complaints.map((c) => (
        <div key={c._id} className="border p-3 mb-3 rounded">
          <p><b>{c.studentName}</b> (Room {c.roomNo})</p>
          <p>{c.issue}</p>

          <select
            value={c.status}
            onChange={(e) =>
              updateStatus(c._id, e.target.value)
            }
            className="border p-2 mt-2"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
