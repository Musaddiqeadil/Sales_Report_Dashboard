import { useState } from "react";
import {
  Search,
  FileSpreadsheet,
  MapPin,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { reportList as initialReports } from "../data/dashboardData";
import Modal from "../components/common/Modal";

const ReportList = () => {
  const [reports] = useState(initialReports);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [executiveFilter, setExecutiveFilter] = useState("All Employees");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const parseDate = (str) => {
    if (!str) return null;
    const [d, m, y] = str.split("/");
    return new Date(`${y}-${m}-${d}`);
  };

  const filtered = reports.filter((r) => {
    const matchExec = executiveFilter === "All Employees" || r.salesExecutive === executiveFilter;
    const rDate = parseDate(r.date);
    const matchFrom = !fromDate || (rDate && rDate >= new Date(fromDate));
    const matchTo = !toDate || (rDate && rDate <= new Date(toDate));
    return matchExec && matchFrom && matchTo;
  });

  const executives = [...new Set(reports.map((r) => r.salesExecutive))];

  const exportCSV = () => {
    const headers = ["#", "Date", "Time", "Sales Executive", "Client Name", "Contact No.", "Project Type", "Products", "Total Value", "Advance", "Pending", "Payment Type", "Status"];
    const rows = filtered.map((r, i) => [i + 1, r.date, r.time, r.salesExecutive, r.clientName, r.contactNo, r.projectType, r.products, r.totalValue, r.advance, r.pending, r.paymentType, r.status]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const openView = (r) => { setSelected(r); setModal("view"); };
  const closeModal = () => { setModal(null); setSelected(null); };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Report List (Employee Wise)</h2>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From Date</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To Date</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sales Executive</label>
              <select value={executiveFilter} onChange={(e) => setExecutiveFilter(e.target.value)} className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500">
                <option>All Employees</option>
                {executives.map((ex) => <option key={ex}>{ex}</option>)}
              </select>
            </div>

            <button onClick={() => { setFromDate(""); setToDate(""); setExecutiveFilter("All Employees"); }} className="flex items-center gap-1.5 bg-red-600 text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-red-700 transition">
              <Search size={14} />
              Reset
            </button>

            <button onClick={exportCSV} className="flex items-center gap-1.5 bg-green-600 text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-green-700 transition">
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
                {filtered.map((item, index) => (
                  <tr key={item.sno} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-red-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{index + 1}</td>
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
                      <span className={`text-sm font-bold ${item.status === "Paid" ? "text-green-600" : "text-gray-700"}`}>{item.status}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200"><MapPin size={16} className="text-red-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center border border-gray-200"><Camera size={16} className="text-red-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <button onClick={() => openView(item)} className="text-red-600 border border-red-600 rounded px-2.5 py-0.5 text-xs font-medium hover:bg-red-50 transition">View</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={16} className="py-8 text-center text-gray-400 border border-gray-200">No reports found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-orange-500 font-medium">
            <ShieldCheck size={16} className="text-orange-500" />
            <span>All reports are GPS verified with date, time & photo to ensure transparency and avoid any misuse.</span>
          </div>
        </div>
      </div>

      {modal === "view" && selected && (
        <Modal title="Visit Report Details" onClose={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Date", value: selected.date },
              { label: "Time", value: selected.time },
              { label: "Sales Executive", value: selected.salesExecutive },
              { label: "Client Name", value: selected.clientName },
              { label: "Contact No.", value: selected.contactNo },
              { label: "Project Type", value: selected.projectType },
              { label: "Products", value: selected.products },
              { label: "Total Value (₹)", value: selected.totalValue },
              { label: "Advance (₹)", value: selected.advance },
              { label: "Pending (₹)", value: selected.pending },
              { label: "Payment Type", value: selected.paymentType },
              { label: "Status", value: selected.status },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-medium text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-5 pt-4 border-t border-gray-200">
            <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReportList;
