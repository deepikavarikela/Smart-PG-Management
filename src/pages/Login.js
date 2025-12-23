import { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { role } = useParams(); // admin / student

  /* ================= EMAIL + PASSWORD LOGIN ================= */
  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
        role,
      });

      // ✅ SAVE EVERYTHING
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🔥 THIS FIXES COMPLAINT + SOCKET
      localStorage.setItem(
        "studentName",
        res.data.name.trim().toLowerCase()
      );

      res.data.role === "admin"
        ? navigate("/admin")
        : navigate("/student");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Smart PG Management
        </h2>

        <p className="text-center mb-4 font-semibold capitalize">
          {role} Login
        </p>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-indigo-600 text-white w-full py-2 rounded mb-4"
        >
          Login
        </button>

        <button
          onClick={googleLogin}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
