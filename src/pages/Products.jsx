import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Package,
  IndianRupee,
  Layers,
  AlertTriangle,
} from "lucide-react";
import Modal from "../components/common/Modal";

const initialProducts = [
  { id: 1, name: "CCTV Camera (4MP)", category: "Security", unit: "Pcs", price: "3,500", stock: 45, supplier: "HikVision India", status: "In Stock" },
  { id: 2, name: "Biometric Attendance System", category: "Access Control", unit: "Set", price: "12,000", stock: 8, supplier: "ZKTeco", status: "In Stock" },
  { id: 3, name: "Fire Alarm Panel", category: "Safety", unit: "Set", price: "18,500", stock: 3, supplier: "Honeywell India", status: "Low Stock" },
  { id: 4, name: "Networking Switch (24 Port)", category: "Networking", unit: "Pcs", price: "8,200", stock: 12, supplier: "Cisco Systems", status: "In Stock" },
  { id: 5, name: "Solar Panel (400W)", category: "Energy", unit: "Pcs", price: "15,000", stock: 0, supplier: "Tata Power Solar", status: "Out of Stock" },
  { id: 6, name: "UPS 3KVA Online", category: "Power Backup", unit: "Pcs", price: "25,000", stock: 5, supplier: "APC by Schneider", status: "Low Stock" },
  { id: 7, name: "LED Display Board", category: "Display", unit: "Pcs", price: "35,000", stock: 10, supplier: "Samsung India", status: "In Stock" },
  { id: 8, name: "Server Rack (42U)", category: "Infrastructure", unit: "Pcs", price: "22,000", stock: 4, supplier: "NetRack Enclosures", status: "Low Stock" },
];

const statusColors = {
  "In Stock": "bg-green-50 text-green-600 border-green-500",
  "Low Stock": "bg-yellow-50 text-yellow-600 border-yellow-500",
  "Out of Stock": "bg-red-50 text-red-600 border-red-500",
};

const categories = ["Security", "Access Control", "Safety", "Networking", "Energy", "Power Backup", "Display", "Infrastructure"];
const statusOptions = ["In Stock", "Low Stock", "Out of Stock"];
const unitOptions = ["Pcs", "Set", "Kg", "Litre", "Meter"];
const emptyForm = { name: "", category: "Security", unit: "Pcs", price: "", stock: 0, supplier: "", status: "In Stock" };

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q);
    const matchCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
    const matchStatus = statusFilter === "All Status" || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const openAdd = () => { setFormData(emptyForm); setModal("add"); };
  const openView = (p) => { setSelected(p); setModal("view"); };
  const openEdit = (p) => { setSelected(p); setFormData({ ...p }); setModal("edit"); };
  const openDelete = (p) => { setSelected(p); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelected(null); setFormData(emptyForm); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "stock" ? Number(value) : value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts((prev) => [...prev, { ...formData, id: newId }]);
    closeModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setProducts((prev) => prev.map((p) => (p.id === selected.id ? { ...formData, id: selected.id } : p)));
    closeModal();
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== selected.id));
    closeModal();
  };

  const renderForm = (onSubmit, submitLabel) => (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <select name="unit" value={formData.unit} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
            {unitOptions.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input name="price" value={formData.price} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
          <input name="supplier" value={formData.supplier} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
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
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products by name, category..." className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Categories</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
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
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Product Name</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Category</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Unit</th>
                  <th className="py-3 px-3 text-right text-xs font-bold border border-slate-700">Price (₹)</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Stock</th>
                  <th className="py-3 px-3 text-left text-xs font-bold border border-slate-700">Supplier</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Status</th>
                  <th className="py-3 px-3 text-center text-xs font-bold border border-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, index) => (
                  <tr key={product.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-red-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{index + 1}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Package size={15} className="text-purple-600 shrink-0" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5"><Layers size={13} className="text-gray-400" />{product.category}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">{product.unit}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">
                      <div className="flex items-center justify-end gap-1"><IndianRupee size={13} className="text-gray-400" />{product.price}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200 font-semibold">{product.stock}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{product.supplier}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${statusColors[product.status]}`}>{product.status}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-1.5">
                        <button title="View" onClick={() => openView(product)} className="p-1.5 hover:bg-red-100 rounded-md transition"><Eye size={15} className="text-red-600" /></button>
                        <button title="Edit" onClick={() => openEdit(product)} className="p-1.5 hover:bg-green-100 rounded-md transition"><Pencil size={15} className="text-green-600" /></button>
                        <button title="Delete" onClick={() => openDelete(product)} className="p-1.5 hover:bg-red-100 rounded-md transition"><Trash2 size={15} className="text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="py-8 text-center text-gray-400 border border-gray-200">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing {filtered.length} of {products.length} entries</span>
          </div>
        </div>
      </div>

      {modal === "add" && <Modal title="Add New Product" onClose={closeModal}>{renderForm(handleAdd, "Add Product")}</Modal>}
      {modal === "edit" && <Modal title="Edit Product" onClose={closeModal}>{renderForm(handleEdit, "Save Changes")}</Modal>}

      {modal === "view" && selected && (
        <Modal title="Product Details" onClose={closeModal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Product Name", value: selected.name },
              { label: "Category", value: selected.category },
              { label: "Unit", value: selected.unit },
              { label: "Price (₹)", value: selected.price },
              { label: "Stock", value: selected.stock },
              { label: "Supplier", value: selected.supplier },
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
        <Modal title="Delete Product" onClose={closeModal} maxWidth="max-w-md">
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

export default Products;
