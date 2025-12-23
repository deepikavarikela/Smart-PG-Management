import { useState } from "react";

const NotificationBell = ({ notifications = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 🔔 Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* 🔔 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-3 z-50">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div
                key={i}
                className="border-b last:border-b-0 pb-2 mb-2"
              >
                <p className="text-sm font-semibold">
                  {n.message}
                </p>
                <p className="text-xs text-gray-500">
                  {n.time}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
