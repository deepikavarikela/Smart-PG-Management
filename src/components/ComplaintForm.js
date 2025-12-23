import { useState } from "react";
import API from "../services/api";

const ComplaintForm = () => {
  const [issue, setIssue] = useState("");

  const studentName = localStorage.getItem("studentName");

  const submit = async () => {
    if (!studentName) {
      alert("Student not found. Please login again.");
      return;
    }

    if (!issue.trim()) {
      alert("Please enter the issue");
      return;
    }

    try {
      await API.post("/complaints", {
        studentName: studentName.toLowerCase(),
        issue: issue.trim(),
      });

      alert("✅ Complaint submitted successfully");
      setIssue("");
    } catch (err) {
      console.error("Complaint error:", err.response?.data || err);
      alert("❌ Complaint submission failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold text-red-600 mb-4">
        Raise Complaint
      </h3>

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Describe the issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Submit Complaint
      </button>
    </div>
  );
};

export default ComplaintForm;
