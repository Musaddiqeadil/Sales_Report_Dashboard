import { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  IndianRupee,
  MapPin,
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const executives = ["Amit Verma", "Priya Singh", "Rahul Kumar", "Neha Srivastava", "Ankit Yadav"];
const clients = ["ABC INFOTECH PVT. LTD.", "XYZ SOLUTIONS", "TECHNO HUB", "SHARMA INFRA DEVELOPERS", "GREENFIELD CONSTRUCTIONS", "BLUESTAR TECHNOLOGIES", "NEXGEN TECHNOLOGIES", "METRO BUILDERS", "PINNACLE SOLUTIONS", "URBAN DEVELOPERS", "SKYLINE INFRA", "ROYAL CONSTRUCTIONS", "DIGITAL WAVES", "SUNTECH ENERGY", "PRIMESOFT LABS", "VERTEX BUILDERS", "QUANTUM SYSTEMS", "HORIZON INFRA"];
const projectNames = ["CRM Software", "E-Commerce Portal", "Business Management System", "Inventory Management", "Corporate Website", "Office Complex (G+5)", "ERP System", "Mobile App Development", "Data Analytics Platform", "Cloud Migration", "Security Audit System", "HR Management Portal", "Supply Chain Tool", "IoT Dashboard", "AI Chatbot Integration", "Billing System", "Warehouse Management", "Client Portal"];
const actions = ["Visit completed", "Payment received", "New lead added", "Project completed", "Visit scheduled", "Project started", "Contract signed", "Follow-up done"];
const timings = ["1 hour ago", "2 hours ago", "3 hours ago", "4 hours ago", "5 hours ago", "6 hours ago", "1 day ago", "2 days ago", "3 days ago"];

const seed = (key) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = ((h << 5) - h + key.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const pick = (arr, s) => arr[s % arr.length];

const formatINR = (num) => num.toLocaleString("en-IN");

const generateMonthData = (key) => {
  const [y, m] = key.split("-").map(Number);
  const monthIndex = (y - 2025) * 12 + (m - 1);
  const s = seed(key);

  const baseVisits = 110 + Math.round(Math.sin(monthIndex * 0.5) * 20) + (monthIndex * 3);
  const visits = baseVisits + (s % 15);
  const baseRevenue = 1400000 + (monthIndex * 80000) + ((s % 5) * 50000);
  const revenue = Math.round(baseRevenue / 10000) * 10000;
  const activeClients = 17 + Math.floor(monthIndex * 0.5) + (s % 3);
  const totalProjects = 13 + Math.floor(monthIndex * 0.4) + (s % 3);

  const prevVisits = 110 + Math.round(Math.sin((monthIndex - 1) * 0.5) * 20) + ((monthIndex - 1) * 3) + (seed(key + "p") % 15);
  const prevRevenue = 1400000 + ((monthIndex - 1) * 80000) + ((seed(key + "p") % 5) * 50000);
  const visitChange = prevVisits > 0 ? Math.round(((visits - prevVisits) / prevVisits) * 100) : 0;
  const revenueChange = prevRevenue > 0 ? Math.round(((revenue - Math.round(prevRevenue / 10000) * 10000) / (Math.round(prevRevenue / 10000) * 10000)) * 100) : 0;

  const summary = [
    { title: "Total Visits", value: String(visits), change: `${visitChange >= 0 ? "+" : ""}${visitChange}%`, trend: visitChange >= 0 ? "up" : "down", icon: MapPin, color: "bg-red-100", iconColor: "text-red-600" },
    { title: "Total Revenue", value: `₹${formatINR(revenue)}`, change: `${revenueChange >= 0 ? "+" : ""}${revenueChange}%`, trend: revenueChange >= 0 ? "up" : "down", icon: IndianRupee, color: "bg-green-100", iconColor: "text-green-600" },
    { title: "Active Clients", value: String(activeClients), change: `+${1 + (s % 3)}`, trend: "up", icon: Users, color: "bg-purple-100", iconColor: "text-purple-600" },
    { title: "Projects", value: String(totalProjects), change: monthIndex % 4 === 3 ? "-1" : `+${1 + (s % 2)}`, trend: monthIndex % 4 === 3 ? "down" : "up", icon: Briefcase, color: "bg-orange-100", iconColor: "text-orange-600" },
  ];

  const execData = executives.map((name, i) => {
    const base = visits - (i * Math.floor(visits / 8));
    const v = Math.max(8, Math.floor(base / executives.length) + ((seed(key + name) % 10) - 3));
    const rev = Math.round((v * (revenue / visits) * (1 + (seed(key + name + "r") % 20 - 10) / 100)) / 10000) * 10000;
    const conv = Math.max(50, 80 - (i * 4) - (seed(key + name + "c") % 5));
    return { rank: i + 1, name, visits: v, revenue: formatINR(rev), conversion: `${conv}%` };
  }).sort((a, b) => b.visits - a.visits).map((e, i) => ({ ...e, rank: i + 1 }));

  const inProgress = 5 + (s % 5);
  const completed = 3 + (seed(key + "c") % 4);
  const planning = 2 + (seed(key + "pl") % 3);
  const onHold = 1 + (seed(key + "h") % 2);
  const projTotal = inProgress + completed + planning + onHold;
  const projects = [
    { status: "In Progress", count: inProgress, percentage: `${Math.round((inProgress / projTotal) * 100)}%`, color: "bg-blue-500" },
    { status: "Completed", count: completed, percentage: `${Math.round((completed / projTotal) * 100)}%`, color: "bg-green-500" },
    { status: "Planning", count: planning, percentage: `${Math.round((planning / projTotal) * 100)}%`, color: "bg-yellow-500" },
    { status: "On Hold", count: onHold, percentage: `${Math.round((onHold / projTotal) * 100)}%`, color: "bg-red-500" },
  ];

  const activity = Array.from({ length: 5 }, (_, i) => {
    const as = seed(key + String(i));
    const action = pick(actions, as);
    let detail = "";
    if (action.includes("Visit")) detail = `${pick(executives, as + 1)} visited ${pick(clients, as + 2)}`;
    else if (action.includes("Payment")) detail = `₹${formatINR((1 + (as % 4)) * 100000)} from ${pick(clients, as + 3)}`;
    else if (action.includes("lead")) detail = `${pick(executives, as + 4)} added ${pick(clients, as + 5)}`;
    else if (action.includes("Project")) detail = `${pick(projectNames, as + 6)} for ${pick(clients, as + 7)}`;
    else if (action.includes("Contract")) detail = `${pick(clients, as + 8)} signed for ${pick(projectNames, as + 9)}`;
    else detail = `${pick(executives, as + 10)} → ${pick(clients, as + 11)}`;
    return { id: i + 1, action, detail, time: pick(timings, as + i) };
  });

  return { label: `${monthNames[m - 1]} ${y}`, summary, executives: execData, projects, activity, visits, revenue };
};

const generateMonthKeys = () => {
  const keys = [];
  for (let y = 2025; y <= 2026; y++) {
    const endM = y === 2026 ? 6 : 12;
    for (let m = 1; m <= endM; m++) {
      keys.push(`${y}-${String(m).padStart(2, "0")}`);
    }
  }
  return keys;
};

const monthKeys = generateMonthKeys();

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("2026-06");

  const allData = useMemo(() => {
    const map = {};
    monthKeys.forEach((key) => { map[key] = generateMonthData(key); });
    return map;
  }, []);

  const data = allData[selectedMonth];
  const currentIndex = monthKeys.indexOf(selectedMonth);

  const goToPrev = () => {
    if (currentIndex > 0) setSelectedMonth(monthKeys[currentIndex - 1]);
  };

  const goToNext = () => {
    if (currentIndex < monthKeys.length - 1) setSelectedMonth(monthKeys[currentIndex + 1]);
  };

  const totalProjects = data.projects.reduce((sum, p) => sum + p.count, 0);

  const selectedYear = selectedMonth.split("-")[0];
  const yearMonths = monthKeys.filter((k) => k.startsWith(selectedYear));
  const performanceData = yearMonths.map((key) => {
    const d = allData[key];
    const mi = parseInt(key.split("-")[1]) - 1;
    return { key, month: shortMonths[mi], year: selectedYear, visits: d.visits, revenue: formatINR(d.revenue) };
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-900">Analytics & Overview</h2>
        <div className="flex items-center gap-1">
          <button onClick={goToPrev} disabled={currentIndex === 0} className={`p-1.5 rounded-md transition ${currentIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}>
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
            <Calendar size={16} className="text-red-600" />
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="text-sm font-medium text-gray-700 bg-transparent outline-none cursor-pointer">
              {monthKeys.map((key) => (
                <option key={key} value={key}>{allData[key].label}</option>
              ))}
            </select>
          </div>
          <button onClick={goToNext} disabled={currentIndex === monthKeys.length - 1} className={`p-1.5 rounded-md transition ${currentIndex === monthKeys.length - 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.summary.map((card) => (
          <div key={card.title} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 ${card.color} rounded-lg`}>
                <card.icon size={20} className={card.iconColor} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${card.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                {card.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <BarChart3 size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">Monthly Performance ({selectedYear})</h3>
          </div>
          <div className="p-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">Month</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">Visits</th>
                  <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">Revenue (₹)</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">Trend</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((item, index) => (
                  <tr key={item.key} className={selectedMonth === item.key ? "bg-red-50" : "bg-white"}>
                    <td className="py-2.5 px-3 border border-gray-300 font-medium">{item.month} {item.year}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-300">{item.visits}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-300">{item.revenue}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-300">
                      {index > 0 && item.visits > performanceData[index - 1].visits ? (
                        <TrendingUp size={16} className="text-green-600 mx-auto" />
                      ) : index > 0 ? (
                        <TrendingDown size={16} className="text-red-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <PieChart size={18} className="text-purple-600" />
            <h3 className="font-semibold text-gray-900">Project Status Distribution</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {data.projects.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                    <span className="text-sm text-gray-500">{item.count} ({item.percentage})</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: item.percentage }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total Projects</span>
                <span className="text-lg font-bold text-gray-900">{totalProjects}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <Award size={18} className="text-amber-500" />
            <h3 className="font-semibold text-gray-900">Top Sales Executives</h3>
          </div>
          <div className="p-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">Rank</th>
                  <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">Name</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">Visits</th>
                  <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">Revenue (₹)</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {data.executives.map((exec) => (
                  <tr key={exec.rank} className="bg-white">
                    <td className="py-2.5 px-3 text-center border border-gray-300">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        exec.rank === 1 ? "bg-amber-100 text-amber-700" :
                        exec.rank === 2 ? "bg-gray-100 text-gray-700" :
                        exec.rank === 3 ? "bg-orange-100 text-orange-700" :
                        "bg-gray-50 text-gray-500"
                      }`}>
                        {exec.rank}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-300 font-medium">{exec.name}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-300">{exec.visits}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-300">{exec.revenue}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-300">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        parseInt(exec.conversion) >= 70 ? "bg-green-50 text-green-600" :
                        parseInt(exec.conversion) >= 60 ? "bg-yellow-50 text-yellow-600" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {exec.conversion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <Target size={18} className="text-green-600" />
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-4">
            <div className="space-y-0">
              {data.activity.map((activity, index) => (
                <div key={activity.id} className={`flex gap-3 py-3 ${index < data.activity.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.detail}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
