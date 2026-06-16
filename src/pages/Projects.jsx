import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Briefcase,
  CalendarDays,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";
import Modal from "../components/common/Modal";

const initialProjects = [
  { id: 1, name: "Business Management System", client: "ABC INFOTECH PVT. LTD.", type: "Web Application", incharge: "Vikash Gupta", startDate: "2025-04-15", deadline: "2025-08-15", budget: "5,00,000", status: "In Progress" },
  { id: 2, name: "CRM Software", client: "XYZ SOLUTIONS", type: "Mobile App", incharge: "Rahul Kumar", startDate: "2025-05-01", deadline: "2025-07-30", budget: "3,00,000", status: "In Progress" },
  { id: 3, name: "E-Commerce Portal", client: "TECHNO HUB", type: "Web Application", incharge: "Priya Singh", startDate: "2025-03-10", deadline: "2025-06-10", budget: "2,50,000", status: "Completed" },
  { id: 4, name: "Office Complex (G+5)", client: "SHARMA INFRA DEVELOPERS", type: "Commercial Building", incharge: "Amit Sharma", startDate: "2025-05-20", deadline: "2025-12-20", budget: "8,00,000", status: "Planning" },
  { id: 5, name: "Inventory Management", client: "GREENFIELD CONSTRUCTIONS", type: "Software", incharge: "Ankit Yadav", startDate: "2025-06-01", deadline: "2025-09-30", budget: "1,80,000", status: "On Hold" },
  { id: 6, name: "Corporate Website", client: "BLUESTAR TECHNOLOGIES", type: "Web Application", incharge: "Neha Srivastava", startDate: "2025-05-05", deadline: "2025-07-05", budget: "1,20,000", status: "In Progress" },
];

const statusColors = {
  "In Progress": "bg-blue-50 text-blue-600 border-blue-500",
  "Completed": "bg-green-50 text-green-600 border-green-500",
  "Planning": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "On Hold": "bg-red-50 text-red-600 border-red-500",
};

const statusOptions = ["In Progress", "Completed", "Planning", "On Hold"];
const emptyForm = { name: "", client: "", type: "", incharge: "", startDate: "", deadline: "", budget: "", status: "In Progress" };

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.incharge.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setFormData(emptyForm); setModal("add"); };
  const openView = (p) => { setSelected(p); setModal("view"); };
  const openEdit = (p) => { setSelected(p); setFormData({ ...p }); setModal("edit"); };
  const openDelete = (p) => { setSelected(p); setModal("delete"); };

  const closeModal = () => { setModal(null); setSelected(null); setFormData(emptyForm); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    setProjects((prev) => [...prev, { ...formData, id: newId }]);
    closeModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setProjects((prev) => prev.map((p) => (p.id === selected.id ? { ...formData, id: selected.id } : p)));
    closeModal();
  };

  const handleDelete = () => {
    setProjects((prev) => prev.filter((p) => p.id !== selected.id));
    closeModal();
  };

  const renderForm = (onSubmit, submitLabel) => (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <input name="client" value={formData.client} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <input name="type" value={formData.type} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Incharge</label>
          <input name="incharge" value={formData.incharge} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
          <input name="budget" value={formData.budget} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            {statusOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
        <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition">{submitLabel}</button>
      </div>
    </form>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects by name, client..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Status</option>
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
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
                {filtered.map((project, index) => (
                  <tr key={project.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-red-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{index + 1}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Briefcase size={15} className="text-red-600 shrink-0" />
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">{project.client}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{project.type}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{project.incharge}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1">
                        <CalendarDays size={13} className="text-gray-400" />
                        {formatDate(project.startDate)}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1">
                        <CalendarDays size={13} className="text-gray-400" />
                        {formatDate(project.deadline)}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee size={13} className="text-gray-400" />
                        {project.budget}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${statusColors[project.status]}`}>{project.status}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1.5">
                        <button title="View" onClick={() => openView(project)} className="p-1.5 hover:bg-red-100 rounded-md transition"><Eye size={15} className="text-red-600" /></button>
                        <button title="Edit" onClick={() => openEdit(project)} className="p-1.5 hover:bg-green-100 rounded-md transition"><Pencil size={15} className="text-green-600" /></button>
                        <button title="Delete" onClick={() => openDelete(project)} className="p-1.5 hover:bg-red-100 rounded-md transition"><Trash2 size={15} className="text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="py-8 text-center text-gray-400 border border-gray-200">No projects found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing {filtered.length} of {projects.length} entries</span>
          </div>
        </div>
      </div>

      {modal === "add" && <Modal title="Add New Project" onClose={closeModal}>{renderForm(handleAdd, "Add Project")}</Modal>}
      {modal === "edit" && <Modal title="Edit Project" onClose={closeModal}>{renderForm(handleEdit, "Save Changes")}</Modal>}

      {modal === "view" && selected && (
        <Modal title="Project Details" onClose={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Project Name", value: selected.name },
              { label: "Client", value: selected.client },
              { label: "Type", value: selected.type },
              { label: "Incharge", value: selected.incharge },
              { label: "Start Date", value: formatDate(selected.startDate) },
              { label: "Deadline", value: formatDate(selected.deadline) },
              { label: "Budget (₹)", value: selected.budget },
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

      {modal === "delete" && selected && (
        <Modal title="Delete Project" onClose={closeModal} maxWidth="max-w-md">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"><AlertTriangle size={24} className="text-red-600" /></div>
            <p className="text-sm text-gray-600">Are you sure you want to delete <strong>{selected.name}</strong>? This action cannot be undone.</p>
          </div>
          <div className="flex justify-center gap-3 mt-5 pt-4 border-t border-gray-200">
            <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Projects;
