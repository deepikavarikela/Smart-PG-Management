import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardCharts = ({ data }) => {
  const COLORS = ["#6366f1", "#22c55e"];

  // 🛡 FULL SAFETY CHECK
  if (
    !data ||
    !Array.isArray(data.fees) ||
    !Array.isArray(data.joinedLeft)
  ) {
    return (
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <p className="text-gray-500">Loading charts...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* BAR CHART */}
      <div className="bg-white p-5 rounded-xl shadow col-span-2">
        <h3 className="font-bold mb-4">
          Students Joined vs Left
        </h3>

        <BarChart width={500} height={250} data={data.joinedLeft}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="joined" fill="#6366f1" />
          <Bar dataKey="left" fill="#22c55e" />
        </BarChart>
      </div>

      {/* DONUT CHART */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-bold mb-4">Fee Status</h3>

        <PieChart width={250} height={250}>
          <Pie
            data={data.fees}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.fees.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default DashboardCharts;
