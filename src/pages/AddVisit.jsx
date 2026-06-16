import { useState, useRef } from "react";
import {
  Save,
  RotateCcw,
  Calendar,
  User,
  Package,
  CreditCard,
  MessageSquare,
  Upload,
  MapPin,
  Plus,
  Minus,
  FileText,
  Image,
  Trash2,
  CheckCircle,
} from "lucide-react";

const emptyProduct = { name: "", quantity: "", unit: "Nos", demandType: "New" };

const getInitialForm = () => ({
  date: "",
  time: "",
  salesExecutive: "",
  territory: "",
  location: "",
  purpose: "",
  clientName: "",
  contactPerson: "",
  contactNumber: "",
  email: "",
  projectType: "",
  whatToBuild: "",
  paymentType: "Bank Transfer",
  totalAmount: "",
  advanceAmount: "",
  notes: "",
});

const AddVisit = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState(getInitialForm);
  const [products, setProducts] = useState([{ ...emptyProduct }, { ...emptyProduct }]);
  const [success, setSuccess] = useState(false);

  const pendingAmount = Math.max(0, (Number(form.totalAmount) || 0) - (Number(form.advanceAmount) || 0));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, field, value) => {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { ...emptyProduct }]);
  };

  const removeProduct = (index) => {
    if (products.length <= 1) return;
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileType = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["doc", "docx"].includes(ext)) return "docx";
    return "jpg";
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: formatSize(f.size),
      type: getFileType(f.name),
    }));
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm(getInitialForm());
    setProducts([{ ...emptyProduct }, { ...emptyProduct }]);
    setFiles([]);
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Add New Visit</h2>

      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-300 rounded-lg px-4 py-3 mb-5">
          <CheckCircle size={20} className="text-green-600 shrink-0" />
          <p className="text-sm font-medium text-green-700">Visit submitted successfully! Form will reset shortly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-5">
          <div className="bg-blue-900 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
            <Calendar size={16} />
            <h3>Visit Information</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Time <span className="text-red-500">*</span></label>
              <input type="time" name="time" value={form.time} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sales Executive <span className="text-red-500">*</span></label>
              <input type="text" name="salesExecutive" value={form.salesExecutive} onChange={handleChange} required placeholder="Enter name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Territory</label>
              <input type="text" name="territory" value={form.territory} onChange={handleChange} placeholder="Enter territory" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <div className="flex gap-2">
                <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Enter location" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                <button type="button" className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <MapPin size={16} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Purpose of Visit <span className="text-red-500">*</span></label>
              <select name="purpose" value={form.purpose} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Select purpose</option>
                <option>Product Demand</option>
                <option>Project Discussion</option>
                <option>Payment Collection</option>
                <option>Follow Up</option>
                <option>Product Demo</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-5">
          <div className="bg-green-700 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
            <User size={16} />
            <h3>Client Information</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client Name <span className="text-red-500">*</span></label>
              <input type="text" name="clientName" value={form.clientName} onChange={handleChange} required placeholder="Enter client name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person</label>
              <input type="text" name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Enter contact person" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number <span className="text-red-500">*</span></label>
              <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} required placeholder="+91 98765 43210" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type <span className="text-red-500">*</span></label>
              <select name="projectType" value={form.projectType} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Select type</option>
                <option>Residential</option>
                <option>Commercial Building</option>
                <option>Industrial</option>
                <option>Government</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">What to Build</label>
              <input type="text" name="whatToBuild" value={form.whatToBuild} onChange={handleChange} placeholder="e.g. Office Complex (G+5 Building)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-5">
          <div className="bg-amber-700 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
            <Package size={16} />
            <h3>Products Demand</h3>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-3 text-left text-xs font-bold border border-gray-300">Product Name</th>
                    <th className="py-2 px-3 text-center text-xs font-bold border border-gray-300 w-24">Quantity</th>
                    <th className="py-2 px-3 text-center text-xs font-bold border border-gray-300 w-24">Unit</th>
                    <th className="py-2 px-3 text-center text-xs font-bold border border-gray-300 w-28">Demand Type</th>
                    <th className="py-2 px-3 text-center text-xs font-bold border border-gray-300 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="bg-white">
                      <td className="py-1.5 px-2 border border-gray-300">
                        <input type="text" value={product.name} onChange={(e) => handleProductChange(index, "name", e.target.value)} placeholder="Enter product" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                      </td>
                      <td className="py-1.5 px-2 border border-gray-300">
                        <input type="number" value={product.quantity} onChange={(e) => handleProductChange(index, "quantity", e.target.value)} placeholder="0" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-red-500" />
                      </td>
                      <td className="py-1.5 px-2 border border-gray-300">
                        <select value={product.unit} onChange={(e) => handleProductChange(index, "unit", e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500">
                          <option>Nos</option>
                          <option>Kg</option>
                          <option>Litre</option>
                          <option>Meter</option>
                          <option>Set</option>
                        </select>
                      </td>
                      <td className="py-1.5 px-2 border border-gray-300">
                        <select value={product.demandType} onChange={(e) => handleProductChange(index, "demandType", e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500">
                          <option>New</option>
                          <option>Replacement</option>
                          <option>Additional</option>
                        </select>
                      </td>
                      <td className="py-1.5 px-2 border border-gray-300 text-center">
                        <button type="button" onClick={() => removeProduct(index)} className={`p-1 rounded transition ${products.length <= 1 ? "text-gray-300 cursor-not-allowed" : "text-red-500 hover:bg-red-50"}`} disabled={products.length <= 1}>
                          <Minus size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" onClick={addProduct} className="flex items-center gap-2 mt-3 text-sm font-medium text-red-600 hover:text-red-700 transition">
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-violet-800 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
              <CreditCard size={16} />
              <h3>Payment Information</h3>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Type</label>
                <select name="paymentType" value={form.paymentType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>UPI</option>
                  <option>Credit Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Total Amount (₹)</label>
                <input type="number" name="totalAmount" value={form.totalAmount} onChange={handleChange} placeholder="0" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Advance Amount (₹)</label>
                <input type="number" name="advanceAmount" value={form.advanceAmount} onChange={handleChange} placeholder="0" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pending Amount (₹)</label>
                <input type="text" readOnly value={pendingAmount.toLocaleString("en-IN")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-700 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
              <MessageSquare size={16} />
              <h3>Visit Notes / Discussion</h3>
            </div>
            <div className="p-4">
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={5} placeholder="Write your visit notes, discussion points, observations..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-5">
          <div className="bg-cyan-700 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
            <Upload size={16} />
            <h3>Attachments</h3>
          </div>
          <div className="p-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.xlsx,.csv,.txt"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-400 hover:bg-red-50/50 transition"
            >
              <Upload size={28} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG, XLSX (max 10MB)</p>
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {file.type === "pdf" ? (
                        <FileText size={18} className="text-red-500" />
                      ) : file.type === "docx" ? (
                        <FileText size={18} className="text-blue-500" />
                      ) : (
                        <Image size={18} className="text-green-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(index)} className="p-1 hover:bg-red-100 rounded transition">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {files.length === 0 && (
              <p className="text-sm text-gray-400 text-center mt-3">No files uploaded yet</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button type="button" onClick={resetForm} className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <RotateCcw size={16} />
            Reset Form
          </button>
          <button type="submit" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
            <Save size={16} />
            Submit Visit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisit;
