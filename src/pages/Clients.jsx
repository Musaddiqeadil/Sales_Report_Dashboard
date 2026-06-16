import { useState } from "react";
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
  AlertTriangle,
} from "lucide-react";
import Modal from "../components/common/Modal";

const initialClients = [
  { id: 1, name: "ABC INFOTECH PVT. LTD.", contact: "Mr. Rajesh Sharma", phone: "9876543210", email: "rajesh@abcinfotech.com", location: "Lucknow, UP", projects: 3, status: "Active" },
  { id: 2, name: "XYZ SOLUTIONS", contact: "Ms. Priya Singh", phone: "9123456780", email: "priya@xyzsolutions.com", location: "Delhi, NCR", projects: 2, status: "Active" },
  { id: 3, name: "TECHNO HUB", contact: "Mr. Amit Verma", phone: "9988776655", email: "amit@technohub.in", location: "Noida, UP", projects: 1, status: "Active" },
  { id: 4, name: "SHARMA INFRA DEVELOPERS", contact: "Mr. Vikash Gupta", phone: "9876501234", email: "vikash@sharmainfra.com", location: "Kanpur, UP", projects: 4, status: "Active" },
  { id: 5, name: "GREENFIELD CONSTRUCTIONS", contact: "Mr. Deepak Yadav", phone: "9011223344", email: "deepak@greenfield.com", location: "Jaipur, RJ", projects: 1, status: "Inactive" },
  { id: 6, name: "BLUESTAR TECHNOLOGIES", contact: "Ms. Neha Agarwal", phone: "9556677889", email: "neha@bluestartech.com", location: "Mumbai, MH", projects: 2, status: "Active" },
];

const emptyForm = { name: "", contact: "", phone: "", email: "", location: "", projects: 0, status: "Active" };

const Clients = () => {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setFormData(emptyForm);
    setModal("add");
  };

  const openView = (client) => {
    setSelected(client);
    setModal("view");
  };

  const openEdit = (client) => {
    setSelected(client);
    setFormData({ ...client });
    setModal("edit");
  };

  const openDelete = (client) => {
    setSelected(client);
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "projects" ? Number(value) : value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    setClients((prev) => [...prev, { ...formData, id: newId }]);
    closeModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setClients((prev) => prev.map((c) => (c.id === selected.id ? { ...formData, id: selected.id } : c)));
    closeModal();
  };

  const handleDelete = () => {
    setClients((prev) => prev.filter((c) => c.id !== selected.id));
    closeModal();
  };

  const renderForm = (onSubmit, submitLabel) => (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
          <input name="contact" value={formData.contact} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
          <input name="projects" type="number" min="0" value={formData.projects} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Active</option>
            <option>Inactive</option>
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
        <h2 className="text-xl font-bold text-gray-900">Clients</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition">
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients by name, contact, phone..."
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
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
                {filtered.map((client, index) => (
                  <tr key={client.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-red-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{index + 1}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Building2 size={15} className="text-red-600 shrink-0" />
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
                        <button title="View" onClick={() => openView(client)} className="p-1.5 hover:bg-red-100 rounded-md transition">
                          <Eye size={15} className="text-red-600" />
                        </button>
                        <button title="Edit" onClick={() => openEdit(client)} className="p-1.5 hover:bg-green-100 rounded-md transition">
                          <Pencil size={15} className="text-green-600" />
                        </button>
                        <button title="Delete" onClick={() => openDelete(client)} className="p-1.5 hover:bg-red-100 rounded-md transition">
                          <Trash2 size={15} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-gray-400 border border-gray-200">No clients found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing {filtered.length} of {clients.length} entries</span>
          </div>
        </div>
      </div>

      {modal === "add" && (
        <Modal title="Add New Client" onClose={closeModal}>
          {renderForm(handleAdd, "Add Client")}
        </Modal>
      )}

      {modal === "edit" && (
        <Modal title="Edit Client" onClose={closeModal}>
          {renderForm(handleEdit, "Save Changes")}
        </Modal>
      )}

      {modal === "view" && selected && (
        <Modal title="Client Details" onClose={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Client Name", value: selected.name },
              { label: "Contact Person", value: selected.contact },
              { label: "Phone", value: selected.phone },
              { label: "Email", value: selected.email },
              { label: "Location", value: selected.location },
              { label: "Projects", value: selected.projects },
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
        <Modal title="Delete Client" onClose={closeModal} maxWidth="max-w-md">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
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

export default Clients;
