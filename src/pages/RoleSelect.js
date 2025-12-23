import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      role === "admin"
        ? navigate("/admin")
        : navigate("/student");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Login As</h1>

        <button
          onClick={() => navigate("/login/admin")}
          className="w-full mb-4 bg-blue-500 text-white py-2 rounded"
        >
          Admin
        </button>

        <button
          onClick={() => navigate("/login/student")}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Student
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
