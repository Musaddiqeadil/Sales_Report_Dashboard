import { useState } from "react";
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
  AlertTriangle,
} from "lucide-react";
import Modal from "../components/common/Modal";

const initialMembers = [
  { id: 1, name: "Amit Verma", role: "Sales Executive", department: "Sales", phone: "9876543210", email: "amit@eyerexus.com", location: "Lucknow, UP", joinDate: "2024-01-01", status: "Active" },
  { id: 2, name: "Rahul Kumar", role: "Sales Executive", department: "Sales", phone: "9123456780", email: "rahul@eyerexus.com", location: "Delhi, NCR", joinDate: "2024-03-15", status: "Active" },
  { id: 3, name: "Priya Singh", role: "Team Lead", department: "Sales", phone: "9988776655", email: "priya@eyerexus.com", location: "Noida, UP", joinDate: "2023-06-10", status: "Active" },
  { id: 4, name: "Vikash Gupta", role: "Project Manager", department: "Operations", phone: "9876501234", email: "vikash@eyerexus.com", location: "Kanpur, UP", joinDate: "2023-02-20", status: "Active" },
  { id: 5, name: "Ankit Yadav", role: "Sales Executive", department: "Sales", phone: "9011223344", email: "ankit@eyerexus.com", location: "Jaipur, RJ", joinDate: "2024-08-01", status: "On Leave" },
  { id: 6, name: "Neha Srivastava", role: "Sales Executive", department: "Sales", phone: "9556677889", email: "neha@eyerexus.com", location: "Mumbai, MH", joinDate: "2024-05-05", status: "Active" },
  { id: 7, name: "Deepak Yadav", role: "Admin", department: "Administration", phone: "9334455667", email: "deepak@eyerexus.com", location: "Lucknow, UP", joinDate: "2023-01-01", status: "Active" },
  { id: 8, name: "Suman Pandey", role: "Sales Executive", department: "Sales", phone: "9445566778", email: "suman@eyerexus.com", location: "Varanasi, UP", joinDate: "2024-11-10", status: "Inactive" },
];

const statusColors = {
  "Active": "bg-green-50 text-green-600 border-green-500",
  "On Leave": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "Inactive": "bg-red-50 text-red-600 border-red-500",
};

const roleBgColors = {
  "Sales Executive": "bg-red-600",
  "Team Lead": "bg-purple-600",
  "Project Manager": "bg-orange-600",
  "Admin": "bg-red-600",
};

const roleOptions = ["Sales Executive", "Team Lead", "Project Manager", "Admin"];
const statusOptions = ["Active", "On Leave", "Inactive"];
const deptOptions = ["Sales", "Operations", "Administration", "Marketing"];
const emptyForm = { name: "", role: "Sales Executive", department: "Sales", phone: "", email: "", location: "", joinDate: "", status: "Active" };

const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const Team = () => {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q) || m.phone.includes(q) || m.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "All Roles" || m.role === roleFilter;
    const matchStatus = statusFilter === "All Status" || m.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "Active").length,
    onLeave: members.filter((m) => m.status === "On Leave").length,
    inactive: members.filter((m) => m.status === "Inactive").length,
  };

  const openAdd = () => { setFormData(emptyForm); setModal("add"); };
  const openView = (m) => { setSelected(m); setModal("view"); };
  const openEdit = (m) => { setSelected(m); setFormData({ ...m }); setModal("edit"); };
  const openDelete = (m) => { setSelected(m); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelected(null); setFormData(emptyForm); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;
    setMembers((prev) => [...prev, { ...formData, id: newId }]);
    closeModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setMembers((prev) => prev.map((m) => (m.id === selected.id ? { ...formData, id: selected.id } : m)));
    closeModal();
  };

  const handleDelete = () => {
    setMembers((prev) => prev.filter((m) => m.id !== selected.id));
    closeModal();
  };

  const renderForm = (onSubmit, submitLabel) => (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            {roleOptions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select name="department" value={formData.department} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            {deptOptions.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
          <input name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
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
        <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition">
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg"><UserRound size={20} className="text-red-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">Total Members</p><p className="text-lg font-bold text-gray-900">{String(stats.total).padStart(2, "0")}</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-lg"><UserRound size={20} className="text-green-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">Active</p><p className="text-lg font-bold text-green-600">{String(stats.active).padStart(2, "0")}</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-yellow-100 rounded-lg"><UserRound size={20} className="text-yellow-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">On Leave</p><p className="text-lg font-bold text-yellow-600">{String(stats.onLeave).padStart(2, "0")}</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-lg"><UserRound size={20} className="text-red-600" /></div>
          <div><p className="text-xs text-gray-500 font-medium">Inactive</p><p className="text-lg font-bold text-red-600">{String(stats.inactive).padStart(2, "0")}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, role, department..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All Roles</option>
            {roleOptions.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All Status</option>
            {statusOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center text-gray-400">No team members found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((member) => (
            <div key={member.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 ${roleBgColors[member.role] || "bg-slate-600"} rounded-full flex items-center justify-center shrink-0`}>
                    <span className="text-white text-sm font-bold">{getInitials(member.name)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded border shrink-0 ${statusColors[member.status]}`}>{member.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"><Briefcase size={11} />{member.department}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"><Calendar size={11} />{formatDate(member.joinDate)}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={13} className="text-green-600 shrink-0" /><span>{member.phone}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><Mail size={13} className="text-red-500 shrink-0" /><span className="truncate">{member.email}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={13} className="text-purple-600 shrink-0" /><span>{member.location}</span></div>
              </div>
              <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-end gap-1">
                <button title="View" onClick={() => openView(member)} className="p-1.5 hover:bg-red-50 rounded-md transition"><Eye size={15} className="text-red-600" /></button>
                <button title="Edit" onClick={() => openEdit(member)} className="p-1.5 hover:bg-green-50 rounded-md transition"><Pencil size={15} className="text-green-600" /></button>
                <button title="Delete" onClick={() => openDelete(member)} className="p-1.5 hover:bg-red-50 rounded-md transition"><Trash2 size={15} className="text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === "add" && <Modal title="Add Team Member" onClose={closeModal}>{renderForm(handleAdd, "Add Member")}</Modal>}
      {modal === "edit" && <Modal title="Edit Team Member" onClose={closeModal}>{renderForm(handleEdit, "Save Changes")}</Modal>}

      {modal === "view" && selected && (
        <Modal title="Member Details" onClose={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: selected.name },
              { label: "Role", value: selected.role },
              { label: "Department", value: selected.department },
              { label: "Phone", value: selected.phone },
              { label: "Email", value: selected.email },
              { label: "Location", value: selected.location },
              { label: "Join Date", value: formatDate(selected.joinDate) },
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
        <Modal title="Delete Member" onClose={closeModal} maxWidth="max-w-md">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4"><AlertTriangle size={24} className="text-red-600" /></div>
            <p className="text-sm text-gray-600">Are you sure you want to remove <strong>{selected.name}</strong> from the team?</p>
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

export default Team;
