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
} from "lucide-react";

const summaryCards = [
  { title: "Total Visits", value: "156", change: "+12%", trend: "up", icon: MapPin, color: "bg-blue-100", iconColor: "text-blue-600" },
  { title: "Total Revenue", value: "₹21,50,000", change: "+8%", trend: "up", icon: IndianRupee, color: "bg-green-100", iconColor: "text-green-600" },
  { title: "Active Clients", value: "24", change: "+3", trend: "up", icon: Users, color: "bg-purple-100", iconColor: "text-purple-600" },
  { title: "Projects", value: "18", change: "-2", trend: "down", icon: Briefcase, color: "bg-orange-100", iconColor: "text-orange-600" },
];

const topExecutives = [
  { rank: 1, name: "Amit Verma", visits: 42, revenue: "5,20,000", conversion: "78%" },
  { rank: 2, name: "Priya Singh", visits: 38, revenue: "4,80,000", conversion: "72%" },
  { rank: 3, name: "Rahul Kumar", visits: 35, revenue: "4,10,000", conversion: "68%" },
  { rank: 4, name: "Neha Srivastava", visits: 28, revenue: "3,50,000", conversion: "65%" },
  { rank: 5, name: "Ankit Yadav", visits: 13, revenue: "1,90,000", conversion: "58%" },
];

const monthlyData = [
  { month: "Jan", visits: 120, revenue: "15,00,000" },
  { month: "Feb", visits: 135, revenue: "16,50,000" },
  { month: "Mar", visits: 142, revenue: "18,20,000" },
  { month: "Apr", visits: 128, revenue: "17,00,000" },
  { month: "May", visits: 156, revenue: "21,50,000" },
];

const projectStatus = [
  { status: "In Progress", count: 8, percentage: "44%", color: "bg-blue-500" },
  { status: "Completed", count: 5, percentage: "28%", color: "bg-green-500" },
  { status: "Planning", count: 3, percentage: "17%", color: "bg-yellow-500" },
  { status: "On Hold", count: 2, percentage: "11%", color: "bg-red-500" },
];

const recentActivity = [
  { id: 1, action: "Visit completed", detail: "Amit Verma visited ABC INFOTECH PVT. LTD.", time: "2 hours ago" },
  { id: 2, action: "Payment received", detail: "₹3,00,000 from XYZ SOLUTIONS (CRM Software)", time: "5 hours ago" },
  { id: 3, action: "New lead added", detail: "Priya Singh added NEXGEN TECHNOLOGIES", time: "1 day ago" },
  { id: 4, action: "Project completed", detail: "E-Commerce Portal for TECHNO HUB", time: "2 days ago" },
  { id: 5, action: "Visit scheduled", detail: "Rahul Kumar → SHARMA INFRA DEVELOPERS", time: "3 days ago" },
];

const Analytics = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800">Analytics & Overview</h2>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-sm text-gray-500 font-medium">May 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
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
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <BarChart3 size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Monthly Performance</h3>
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
                {monthlyData.map((item, index) => (
                  <tr key={item.month} className="bg-white">
                    <td className="py-2.5 px-3 border border-gray-300 font-medium">{item.month} 2025</td>
                    <td className="py-2.5 px-3 text-center border border-gray-300">{item.visits}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-300">{item.revenue}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-300">
                      {index > 0 && item.visits > monthlyData[index - 1].visits ? (
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
            <h3 className="font-semibold text-gray-800">Project Status Distribution</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {projectStatus.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                    <span className="text-sm text-gray-500">{item.count} ({item.percentage})</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`${item.color} h-2.5 rounded-full`} style={{ width: item.percentage }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total Projects</span>
                <span className="text-lg font-bold text-gray-800">18</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <Award size={18} className="text-amber-500" />
            <h3 className="font-semibold text-gray-800">Top Sales Executives</h3>
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
                {topExecutives.map((exec) => (
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
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <div className="p-4">
            <div className="space-y-0">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`flex gap-3 py-3 ${index < recentActivity.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
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
