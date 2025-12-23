import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Navbar = ({ title, notifications }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-indigo-600 text-white p-4">
      <h2 className="text-lg font-bold">{title}</h2>

      <div className="flex items-center gap-6">
        <NotificationBell notifications={notifications} />
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
