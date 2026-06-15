import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  UserRound,
  Calendar,
  Briefcase,
} from "lucide-react";

const teamMembers = [
  { id: 1, name: "Amit Verma", role: "Sales Executive", department: "Sales", phone: "9876543210", email: "amit@eyerexus.com", location: "Lucknow, UP", joinDate: "01/01/2024", status: "Active" },
  { id: 2, name: "Rahul Kumar", role: "Sales Executive", department: "Sales", phone: "9123456780", email: "rahul@eyerexus.com", location: "Delhi, NCR", joinDate: "15/03/2024", status: "Active" },
  { id: 3, name: "Priya Singh", role: "Team Lead", department: "Sales", phone: "9988776655", email: "priya@eyerexus.com", location: "Noida, UP", joinDate: "10/06/2023", status: "Active" },
  { id: 4, name: "Vikash Gupta", role: "Project Manager", department: "Operations", phone: "9876501234", email: "vikash@eyerexus.com", location: "Kanpur, UP", joinDate: "20/02/2023", status: "Active" },
  { id: 5, name: "Ankit Yadav", role: "Sales Executive", department: "Sales", phone: "9011223344", email: "ankit@eyerexus.com", location: "Jaipur, RJ", joinDate: "01/08/2024", status: "On Leave" },
  { id: 6, name: "Neha Srivastava", role: "Sales Executive", department: "Sales", phone: "9556677889", email: "neha@eyerexus.com", location: "Mumbai, MH", joinDate: "05/05/2024", status: "Active" },
  { id: 7, name: "Deepak Yadav", role: "Admin", department: "Administration", phone: "9334455667", email: "deepak@eyerexus.com", location: "Lucknow, UP", joinDate: "01/01/2023", status: "Active" },
  { id: 8, name: "Suman Pandey", role: "Sales Executive", department: "Sales", phone: "9445566778", email: "suman@eyerexus.com", location: "Varanasi, UP", joinDate: "10/11/2024", status: "Inactive" },
];

const statusColors = {
  "Active": "bg-green-50 text-green-600 border-green-500",
  "On Leave": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "Inactive": "bg-red-50 text-red-600 border-red-500",
};

const roleBgColors = {
  "Sales Executive": "bg-blue-600",
  "Team Lead": "bg-purple-600",
  "Project Manager": "bg-orange-600",
  "Admin": "bg-red-600",
};

const getInitials = (name) => {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
};

const Team = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <UserRound size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Members</p>
            <p className="text-lg font-bold text-gray-800">08</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-lg">
            <UserRound size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Active</p>
            <p className="text-lg font-bold text-green-600">06</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-yellow-100 rounded-lg">
            <UserRound size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">On Leave</p>
            <p className="text-lg font-bold text-yellow-600">01</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <UserRound size={20} className="text-red-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Inactive</p>
            <p className="text-lg font-bold text-red-600">01</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, role, department..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Roles</option>
            <option>Sales Executive</option>
            <option>Team Lead</option>
            <option>Project Manager</option>
            <option>Admin</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 ${roleBgColors[member.role] || "bg-slate-600"} rounded-full flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{getInitials(member.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded border shrink-0 ${statusColors[member.status]}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  <Briefcase size={11} />
                  {member.department}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  <Calendar size={11} />
                  {member.joinDate}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 px-4 py-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={13} className="text-green-600 shrink-0" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={13} className="text-red-500 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={13} className="text-purple-600 shrink-0" />
                <span>{member.location}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-end gap-1">
              <button title="View" className="p-1.5 hover:bg-blue-50 rounded-md transition">
                <Eye size={15} className="text-blue-600" />
              </button>
              <button title="Edit" className="p-1.5 hover:bg-green-50 rounded-md transition">
                <Pencil size={15} className="text-green-600" />
              </button>
              <button title="Delete" className="p-1.5 hover:bg-red-50 rounded-md transition">
                <Trash2 size={15} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
