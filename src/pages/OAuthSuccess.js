import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const role = params.get("role");
    const name = params.get("name");

    if (!token || !role || !name) {
      navigate("/");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // 🔥 REQUIRED FOR COMPLAINT + SOCKET
    localStorage.setItem(
      "studentName",
      name.trim().toLowerCase()
    );

    role === "admin"
      ? navigate("/admin")
      : navigate("/student");
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Logging in...</p>
    </div>
  );
};

export default OAuthSuccess;
