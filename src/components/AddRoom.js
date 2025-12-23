import { useState } from "react";
import API from "../services/api";

const AddRoom = () => {
  const [room, setRoom] = useState({
    roomNo: "",
    totalBeds: "",
    occupiedBeds: ""
  });

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      // ✅ CORRECT API ENDPOINT
      await API.post("/room", room);

      alert("Room Added Successfully");

      setRoom({
        roomNo: "",
        totalBeds: "",
        occupiedBeds: ""
      });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add room");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-bold text-indigo-600 mb-4">
        Add Room
      </h3>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Room Number"
        value={room.roomNo}
        onChange={(e) =>
          setRoom({ ...room, roomNo: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Total Beds"
        type="number"
        value={room.totalBeds}
        onChange={(e) =>
          setRoom({ ...room, totalBeds: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Occupied Beds"
        type="number"
        value={room.occupiedBeds}
        onChange={(e) =>
          setRoom({ ...room, occupiedBeds: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Room
      </button>
    </div>
  );
};

export default AddRoom;
