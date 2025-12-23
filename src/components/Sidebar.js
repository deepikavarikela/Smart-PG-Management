const Sidebar = ({ items, active, setActive }) => {
  return (
    <div className="w-56 bg-white h-screen p-4 shadow">
      <h2 className="text-xl font-bold text-indigo-600 mb-6">
        Smart PG
      </h2>

      {items.map((item) => (
        <div
          key={item}
          onClick={() => setActive(item)}
          className={`p-3 mb-2 rounded cursor-pointer ${
            active === item
              ? "bg-indigo-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
