const DashboardStats = ({ stats }) => {
  const card = "bg-white p-5 rounded-xl shadow";

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className={`${card} bg-blue-50`}>
        <p className="text-gray-500">Vacant Beds</p>
        <h2 className="text-2xl font-bold">
          {stats.vacantBeds}
        </h2>
      </div>

      <div className={`${card} bg-green-50`}>
        <p className="text-gray-500">Total Students</p>
        <h2 className="text-2xl font-bold">
          {stats.totalStudents}
        </h2>
      </div>

      <div className={`${card} bg-yellow-50`}>
        <p className="text-gray-500">Complaints</p>
        <h2 className="text-2xl font-bold">
          {stats.complaints}
        </h2>
      </div>

      <div className={`${card} bg-purple-50`}>
        <p className="text-gray-500">Fees Paid</p>
        <h2 className="text-2xl font-bold">
          {stats.paid}/{stats.totalStudents}
        </h2>
      </div>
    </div>
  );
};

export default DashboardStats;
