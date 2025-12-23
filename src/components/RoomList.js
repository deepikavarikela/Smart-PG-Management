import { useEffect, useState } from "react";
import API from "../services/api";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // ✅ CORRECT API ENDPOINT
        const res = await API.get("/room");
        setRooms(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load rooms");
        setRooms([]); // prevent crash
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-bold text-green-600 mb-4">
        Rooms Overview
      </h3>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      {/* EMPTY STATE */}
      {rooms.length === 0 && !error && (
        <p className="text-gray-500">No rooms found</p>
      )}

      {/* ROOMS LIST */}
      {rooms.map((r) => (
        <div
          key={r._id}
          className="flex justify-between mb-2 p-3 border rounded"
        >
          <span>Room {r.roomNo}</span>
          <span>Total: {r.totalBeds}</span>
          <span>Occupied: {r.occupiedBeds}</span>
          <span className="text-red-500">
            Vacant: {r.totalBeds - r.occupiedBeds}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
