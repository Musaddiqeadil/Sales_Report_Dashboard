import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Briefcase,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

const projects = [
  { id: 1, name: "Business Management System", client: "ABC INFOTECH PVT. LTD.", type: "Web Application", incharge: "Vikash Gupta", startDate: "15/04/2025", deadline: "15/08/2025", budget: "5,00,000", status: "In Progress" },
  { id: 2, name: "CRM Software", client: "XYZ SOLUTIONS", type: "Mobile App", incharge: "Rahul Kumar", startDate: "01/05/2025", deadline: "30/07/2025", budget: "3,00,000", status: "In Progress" },
  { id: 3, name: "E-Commerce Portal", client: "TECHNO HUB", type: "Web Application", incharge: "Priya Singh", startDate: "10/03/2025", deadline: "10/06/2025", budget: "2,50,000", status: "Completed" },
  { id: 4, name: "Office Complex (G+5)", client: "SHARMA INFRA DEVELOPERS", type: "Commercial Building", incharge: "Amit Sharma", startDate: "20/05/2025", deadline: "20/12/2025", budget: "8,00,000", status: "Planning" },
  { id: 5, name: "Inventory Management", client: "GREENFIELD CONSTRUCTIONS", type: "Software", incharge: "Ankit Yadav", startDate: "01/06/2025", deadline: "30/09/2025", budget: "1,80,000", status: "On Hold" },
  { id: 6, name: "Corporate Website", client: "BLUESTAR TECHNOLOGIES", type: "Web Application", incharge: "Neha Srivastava", startDate: "05/05/2025", deadline: "05/07/2025", budget: "1,20,000", status: "In Progress" },
];

const statusColors = {
  "In Progress": "bg-blue-50 text-blue-600 border-blue-500",
  "Completed": "bg-green-50 text-green-600 border-green-500",
  "Planning": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "On Hold": "bg-red-50 text-red-600 border-red-500",
};

const Projects = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name, client..."
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Planning</option>
              <option>On Hold</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">#</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Project Name</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Client</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Type</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Incharge</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Start Date</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Deadline</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Budget (₹)</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Status</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{project.id}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Briefcase size={15} className="text-blue-600 shrink-0" />
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">{project.client}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{project.type}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{project.incharge}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1">
                        <CalendarDays size={13} className="text-gray-400" />
                        {project.startDate}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1">
                        <CalendarDays size={13} className="text-gray-400" />
                        {project.deadline}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee size={13} className="text-gray-400" />
                        {project.budget}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${statusColors[project.status]}`}>
                        {project.status}
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
            <span>Showing 1 to {projects.length} of {projects.length} entries</span>
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

export default Projects;
