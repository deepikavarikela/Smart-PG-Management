import { useEffect, useState } from "react";
import API from "../services/api";

const AdminFees = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    API.get("/fees")
      .then(res => setFees(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Fees Management</h2>

      {fees.length === 0 ? (
        <p className="text-gray-500">No fee records found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Student</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {fees.map(fee => (
              <tr key={fee._id} className="border-t text-center">
                <td>{fee.studentName}</td>
                <td>{fee.month}</td>
                <td>₹{fee.amount}</td>
                <td
                  className={
                    fee.status === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {fee.status}
                </td>
                <td>{fee.paymentId || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFees;
