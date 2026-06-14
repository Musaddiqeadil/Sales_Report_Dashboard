const DetailRow = ({ label, value }) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="font-semibold text-gray-700 text-sm">{label}</span>

      <span className="text-gray-600 text-sm break-words bg-gray-50 border border-gray-200 rounded px-3 py-1">{value}</span>
    </div>
  );
};

export default DetailRow;
