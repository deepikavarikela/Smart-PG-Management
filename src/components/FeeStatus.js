const FeeStatus = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-500">
      <h3 className="text-lg font-bold text-orange-500 mb-2">
        Fee Status
      </h3>

      <p>Monthly Rent: ₹6000</p>
      <p>Status: <span className="text-red-600">Pending</span></p>
      <p>Due Date: 10th</p>

      <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Download Receipt
      </button>
    </div>
  );
};

export default FeeStatus;
