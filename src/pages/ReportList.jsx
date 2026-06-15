import {
  Search,
  FileSpreadsheet,
  MapPin,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { reportList } from "../data/dashboardData";

const ReportList = () => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Report List (Employee Wise)</h2>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From Date</label>
              <input
                type="date"
                defaultValue="2025-05-01"
                className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To Date</label>
              <input
                type="date"
                defaultValue="2025-05-20"
                className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sales Executive</label>
              <select className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Employees</option>
                <option>Rahul Kumar</option>
                <option>Priya Singh</option>
                <option>Amit Sharma</option>
              </select>
            </div>

            <button className="flex items-center gap-1.5 bg-blue-600 text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-blue-700 transition">
              <Search size={14} />
              Search
            </button>

            <button className="flex items-center gap-1.5 bg-green-600 text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-green-700 transition">
              <FileSpreadsheet size={14} />
              Export Excel
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">#</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Date</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Time</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Sales Executive</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Client Name</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Contact No.</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Project Type</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Products</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Total Value (₹)</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Advance (₹)</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Pending (₹)</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Payment Type</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Status</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Location</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Photo</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {reportList.map((item, index) => (
                  <tr key={item.sno} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{item.sno}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.date}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.time}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.salesExecutive}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.clientName}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.contactNo}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.projectType}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">{item.products}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">{item.totalValue}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">{item.advance}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">{item.pending}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{item.paymentType}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`text-sm font-bold ${item.status === "Paid" ? "text-green-600" : "text-gray-700"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <MapPin size={16} className="text-blue-600 mx-auto" />
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <Camera size={16} className="text-blue-600 mx-auto" />
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <button className="text-blue-600 border border-blue-600 rounded px-2.5 py-0.5 text-xs font-medium hover:bg-blue-50 transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-orange-500 font-medium">
            <ShieldCheck size={16} className="text-orange-500" />
            <span>
              All reports are GPS verified with date, time & photo to ensure
              transparency and avoid any misuse.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
