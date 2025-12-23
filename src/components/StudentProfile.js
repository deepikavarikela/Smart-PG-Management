import { useEffect, useState } from "react";
import API from "../services/api";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/student/profile/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Profile load failed", err);
      }
    };

    loadProfile();
  }, []);

  if (!profile) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold text-indigo-600 mb-4">
        My Profile
      </h3>

      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Room No:</b> {profile.roomNo || "Not assigned"}</p>
      <p><b>Phone:</b> {profile.phone || "N/A"}</p>
      <p><b>Role:</b> {profile.role}</p>
    </div>
  );
};

export default StudentProfile;
