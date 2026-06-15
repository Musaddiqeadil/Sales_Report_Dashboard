import {
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Eye,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

const clients = [
  { id: 1, name: "ABC INFOTECH PVT. LTD.", contact: "Mr. Rajesh Sharma", phone: "9876543210", email: "rajesh@abcinfotech.com", location: "Lucknow, UP", projects: 3, status: "Active" },
  { id: 2, name: "XYZ SOLUTIONS", contact: "Ms. Priya Singh", phone: "9123456780", email: "priya@xyzsolutions.com", location: "Delhi, NCR", projects: 2, status: "Active" },
  { id: 3, name: "TECHNO HUB", contact: "Mr. Amit Verma", phone: "9988776655", email: "amit@technohub.in", location: "Noida, UP", projects: 1, status: "Active" },
  { id: 4, name: "SHARMA INFRA DEVELOPERS", contact: "Mr. Vikash Gupta", phone: "9876501234", email: "vikash@sharmainfra.com", location: "Kanpur, UP", projects: 4, status: "Active" },
  { id: 5, name: "GREENFIELD CONSTRUCTIONS", contact: "Mr. Deepak Yadav", phone: "9011223344", email: "deepak@greenfield.com", location: "Jaipur, RJ", projects: 1, status: "Inactive" },
  { id: 6, name: "BLUESTAR TECHNOLOGIES", contact: "Ms. Neha Agarwal", phone: "9556677889", email: "neha@bluestartech.com", location: "Mumbai, MH", projects: 2, status: "Active" },
];

const Clients = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800">Clients</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, contact, phone..."
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">#</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Client Name</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Contact Person</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Phone</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Email</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Location</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Projects</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Status</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{client.id}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Building2 size={15} className="text-blue-600 shrink-0" />
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">{client.contact}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <Phone size={13} className="text-green-600" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <Mail size={13} className="text-red-500" />
                        {client.email}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-purple-600" />
                        {client.location}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200 font-semibold">{client.projects}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${
                        client.status === "Active"
                          ? "bg-green-50 text-green-600 border-green-500"
                          : "bg-red-50 text-red-600 border-red-500"
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1.5">
                        <button title="View" className="p-1.5 hover:bg-blue-100 rounded-md transition">
                          <Eye size={15} className="text-blue-600" />
                        </button>
                        <button title="Edit" className="p-1.5 hover:bg-green-100 rounded-md transition">
                          <Pencil size={15} className="text-green-600" />
                        </button>
                        <button title="Delete" className="p-1.5 hover:bg-red-100 rounded-md transition">
                          <Trash2 size={15} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing 1 to {clients.length} of {clients.length} entries</span>
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

export default Clients;
