import { useState } from "react";
import {
  Search,
  FileSpreadsheet,
  CreditCard,
  IndianRupee,
  Calendar,
  Eye,
  Building2,
} from "lucide-react";
import Modal from "../components/common/Modal";

const initialPayments = [
  { id: 1, date: "2025-05-18", client: "ABC INFOTECH PVT. LTD.", project: "Business Management System", totalAmount: "5,00,000", received: "2,50,000", pending: "2,50,000", mode: "Bank Transfer", status: "Partial" },
  { id: 2, date: "2025-05-15", client: "XYZ SOLUTIONS", project: "CRM Software", totalAmount: "3,00,000", received: "3,00,000", pending: "0", mode: "UPI", status: "Paid" },
  { id: 3, date: "2025-05-10", client: "TECHNO HUB", project: "E-Commerce Portal", totalAmount: "2,50,000", received: "2,50,000", pending: "0", mode: "Cheque", status: "Paid" },
  { id: 4, date: "2025-05-08", client: "SHARMA INFRA DEVELOPERS", project: "Office Complex (G+5)", totalAmount: "8,00,000", received: "1,00,000", pending: "7,00,000", mode: "Bank Transfer", status: "Partial" },
  { id: 5, date: "2025-05-05", client: "GREENFIELD CONSTRUCTIONS", project: "Inventory Management", totalAmount: "1,80,000", received: "0", pending: "1,80,000", mode: "—", status: "Unpaid" },
  { id: 6, date: "2025-05-01", client: "BLUESTAR TECHNOLOGIES", project: "Corporate Website", totalAmount: "1,20,000", received: "60,000", pending: "60,000", mode: "UPI", status: "Partial" },
];

const statusColors = {
  "Paid": "bg-green-50 text-green-600 border-green-500",
  "Partial": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "Unpaid": "bg-red-50 text-red-600 border-red-500",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const parseAmount = (str) => Number(str.replace(/,/g, "")) || 0;

const formatAmount = (num) => num.toLocaleString("en-IN");

const Payments = () => {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fromDate, setFromDate] = useState("2025-05-01");
  const [toDate, setToDate] = useState("2025-05-20");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.client.toLowerCase().includes(q) || p.project.toLowerCase().includes(q) || p.mode.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || p.status === statusFilter;
    const matchFrom = !fromDate || p.date >= fromDate;
    const matchTo = !toDate || p.date <= toDate;
    return matchSearch && matchStatus && matchFrom && matchTo;
  });

  const totals = filtered.reduce((acc, p) => ({
    total: acc.total + parseAmount(p.totalAmount),
    received: acc.received + parseAmount(p.received),
    pending: acc.pending + parseAmount(p.pending),
  }), { total: 0, received: 0, pending: 0 });

  const exportCSV = () => {
    const headers = ["#", "Date", "Client", "Project", "Total Amount", "Received", "Pending", "Mode", "Status"];
    const rows = filtered.map((p, i) => [i + 1, formatDate(p.date), p.client, p.project, p.totalAmount, p.received, p.pending, p.mode, p.status]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const openView = (p) => { setSelected(p); setModal("view"); };
  const closeModal = () => { setModal(null); setSelected(null); };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-900">Payments</h2>
        <button onClick={exportCSV} className="flex items-center gap-1.5 bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700 transition">
          <FileSpreadsheet size={16} />
          Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg"><IndianRupee size={20} className="text-red-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">Total Amount</p><p className="text-lg font-bold text-gray-900">₹{formatAmount(totals.total)}</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-lg"><IndianRupee size={20} className="text-green-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">Total Received</p><p className="text-lg font-bold text-green-600">₹{formatAmount(totals.received)}</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg"><IndianRupee size={20} className="text-red-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">Total Pending</p><p className="text-lg font-bold text-red-600">₹{formatAmount(totals.pending)}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by client, project..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border border-gray-300 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border border-gray-300 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
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
                {filtered.map((payment, index) => (
                  <tr key={payment.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-red-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{index + 1}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5"><Calendar size={13} className="text-gray-400" />{formatDate(payment.date)}</div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2"><Building2 size={15} className="text-red-600 shrink-0" /><span className="font-medium">{payment.client}</span></div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">{payment.project}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200 font-semibold">
                      <div className="flex items-center justify-end gap-1"><IndianRupee size={13} className="text-gray-400" />{payment.totalAmount}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right border border-gray-200 text-green-600 font-semibold">
                      <div className="flex items-center justify-end gap-1"><IndianRupee size={13} className="text-green-400" />{payment.received}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right border border-gray-200 text-red-600 font-semibold">
                      <div className="flex items-center justify-end gap-1"><IndianRupee size={13} className="text-red-500" />{payment.pending}</div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5"><CreditCard size={13} className="text-violet-500" />{payment.mode}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${statusColors[payment.status]}`}>{payment.status}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <button title="View" onClick={() => openView(payment)} className="p-1.5 hover:bg-red-100 rounded-md transition"><Eye size={15} className="text-red-600" /></button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="py-8 text-center text-gray-400 border border-gray-200">No payments found</td></tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold text-sm">
                  <td colSpan={4} className="py-2.5 px-3 text-right border border-gray-200">Total</td>
                  <td className="py-2.5 px-3 text-right border border-gray-200">₹{formatAmount(totals.total)}</td>
                  <td className="py-2.5 px-3 text-right border border-gray-200 text-green-600">₹{formatAmount(totals.received)}</td>
                  <td className="py-2.5 px-3 text-right border border-gray-200 text-red-600">₹{formatAmount(totals.pending)}</td>
                  <td colSpan={3} className="py-2.5 px-3 border border-gray-200"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing {filtered.length} of {payments.length} entries</span>
          </div>
        </div>
      </div>

      {modal === "view" && selected && (
        <Modal title="Payment Details" onClose={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Date", value: formatDate(selected.date) },
              { label: "Client", value: selected.client },
              { label: "Project", value: selected.project },
              { label: "Total Amount (₹)", value: selected.totalAmount },
              { label: "Received (₹)", value: selected.received },
              { label: "Pending (₹)", value: selected.pending },
              { label: "Payment Mode", value: selected.mode },
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

export default Payments;
