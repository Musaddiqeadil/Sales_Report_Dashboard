import {
  Search,
  FileSpreadsheet,
  CreditCard,
  IndianRupee,
  Calendar,
  Eye,
  Building2,
} from "lucide-react";

const payments = [
  { id: 1, date: "18/05/2025", client: "ABC INFOTECH PVT. LTD.", project: "Business Management System", totalAmount: "5,00,000", received: "2,50,000", pending: "2,50,000", mode: "Bank Transfer", status: "Partial" },
  { id: 2, date: "15/05/2025", client: "XYZ SOLUTIONS", project: "CRM Software", totalAmount: "3,00,000", received: "3,00,000", pending: "0", mode: "UPI", status: "Paid" },
  { id: 3, date: "10/05/2025", client: "TECHNO HUB", project: "E-Commerce Portal", totalAmount: "2,50,000", received: "2,50,000", pending: "0", mode: "Cheque", status: "Paid" },
  { id: 4, date: "08/05/2025", client: "SHARMA INFRA DEVELOPERS", project: "Office Complex (G+5)", totalAmount: "8,00,000", received: "1,00,000", pending: "7,00,000", mode: "Bank Transfer", status: "Partial" },
  { id: 5, date: "05/05/2025", client: "GREENFIELD CONSTRUCTIONS", project: "Inventory Management", totalAmount: "1,80,000", received: "0", pending: "1,80,000", mode: "—", status: "Unpaid" },
  { id: 6, date: "01/05/2025", client: "BLUESTAR TECHNOLOGIES", project: "Corporate Website", totalAmount: "1,20,000", received: "60,000", pending: "60,000", mode: "UPI", status: "Partial" },
];

const statusColors = {
  "Paid": "bg-green-50 text-green-600 border-green-500",
  "Partial": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "Unpaid": "bg-red-50 text-red-600 border-red-500",
};

const Payments = () => {
  const totalAmount = "21,50,000";
  const totalReceived = "9,60,000";
  const totalPending = "11,90,000";

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800">Payments</h2>
        <button className="flex items-center gap-1.5 bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700 transition">
          <FileSpreadsheet size={16} />
          Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <IndianRupee size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Amount</p>
            <p className="text-lg font-bold text-gray-800">₹{totalAmount}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-lg">
            <IndianRupee size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Received</p>
            <p className="text-lg font-bold text-green-600">₹{totalReceived}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <IndianRupee size={20} className="text-red-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Pending</p>
            <p className="text-lg font-bold text-red-600">₹{totalPending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by client, project..."
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From</label>
              <input
                type="date"
                defaultValue="2025-05-01"
                className="border border-gray-300 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To</label>
              <input
                type="date"
                defaultValue="2025-05-20"
                className="border border-gray-300 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Unpaid</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">#</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Date</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Client</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Project</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Total (₹)</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Received (₹)</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Pending (₹)</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Mode</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Status</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{payment.id}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-400" />
                        {payment.date}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Building2 size={15} className="text-blue-600 shrink-0" />
                        <span className="font-medium">{payment.client}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">{payment.project}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee size={13} className="text-gray-400" />
                        {payment.totalAmount}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right border border-gray-200 text-green-600 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee size={13} className="text-green-400" />
                        {payment.received}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right border border-gray-200 text-red-600 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee size={13} className="text-red-400" />
                        {payment.pending}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <CreditCard size={13} className="text-violet-500" />
                        {payment.mode}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${statusColors[payment.status]}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <button title="View" className="p-1.5 hover:bg-blue-100 rounded-md transition">
                        <Eye size={15} className="text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold text-sm">
                  <td colSpan={4} className="py-2.5 px-3 text-right border border-gray-200">Total</td>
                  <td className="py-2.5 px-3 text-right border border-gray-200">₹{totalAmount}</td>
                  <td className="py-2.5 px-3 text-right border border-gray-200 text-green-600">₹{totalReceived}</td>
                  <td className="py-2.5 px-3 text-right border border-gray-200 text-red-600">₹{totalPending}</td>
                  <td colSpan={3} className="py-2.5 px-3 border border-gray-200"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing 1 to {payments.length} of {payments.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
