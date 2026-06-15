import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Package,
  IndianRupee,
  Layers,
} from "lucide-react";

const products = [
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

const Products = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-800">Products</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, category..."
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Security</option>
              <option>Access Control</option>
              <option>Safety</option>
              <option>Networking</option>
              <option>Energy</option>
              <option>Power Backup</option>
              <option>Display</option>
              <option>Infrastructure</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
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
                {products.map((product, index) => (
                  <tr key={product.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/50 transition-colors`}>
                    <td className="py-2.5 px-3 border border-gray-200">{product.id}</td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Package size={15} className="text-purple-600 shrink-0" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <Layers size={13} className="text-gray-400" />
                        {product.category}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">{product.unit}</td>
                    <td className="py-2.5 px-3 text-right border border-gray-200">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee size={13} className="text-gray-400" />
                        {product.price}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center border border-gray-200 font-semibold">{product.stock}</td>
                    <td className="py-2.5 px-3 border border-gray-200">{product.supplier}</td>
                    <td className="py-2.5 px-3 text-center border border-gray-200">
                      <span className={`px-3 py-1 text-xs font-semibold rounded border ${statusColors[product.status]}`}>
                        {product.status}
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
            <span>Showing 1 to {products.length} of {products.length} entries</span>
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

export default Products;
