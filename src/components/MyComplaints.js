import { useEffect, useState } from "react";
import API from "../services/api";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints");
        setComplaints(res.data || []);
      } catch (err) {
        console.error("Failed to load complaints", err);
        setComplaints([]);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-bold text-indigo-600 mb-4">
        My Complaints
      </h3>

      {complaints.length === 0 && (
        <p className="text-gray-500">No complaints found</p>
      )}

      {complaints.map((c) => (
        <div key={c._id} className="border p-3 mb-2 rounded">
          <p>{c.issue}</p>
          <span
            className={`font-semibold ${
              c.status === "Resolved"
                ? "text-green-600"
                : c.status === "In Progress"
                ? "text-orange-500"
                : "text-red-600"
            }`}
          >
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MyComplaints;
