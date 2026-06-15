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
} from "lucide-react";

const AddVisit = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

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
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Add New Visit</h2>

      <form>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-5">
          <div className="bg-blue-900 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
            <Calendar size={16} />
            <h3>Visit Information</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
              <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sales Executive</label>
              <input type="text" placeholder="Enter name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Territory</label>
              <input type="text" placeholder="Enter territory" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter location" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <MapPin size={16} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Purpose of Visit</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client Name</label>
              <input type="text" placeholder="Enter client name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person</label>
              <input type="text" placeholder="Enter contact person" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
              <input type="tel" placeholder="+91 98765 43210" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="Enter email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
              <input type="text" placeholder="e.g. Office Complex (G+5 Building)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                  <tr className="bg-white">
                    <td className="py-1.5 px-2 border border-gray-300">
                      <input type="text" placeholder="Enter product" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300">
                      <input type="number" placeholder="0" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300">
                      <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Nos</option>
                        <option>Kg</option>
                        <option>Litre</option>
                        <option>Meter</option>
                        <option>Set</option>
                      </select>
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300">
                      <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>New</option>
                        <option>Replacement</option>
                        <option>Additional</option>
                      </select>
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300 text-center">
                      <button type="button" className="p-1 text-red-500 hover:bg-red-50 rounded transition">
                        <Minus size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-1.5 px-2 border border-gray-300">
                      <input type="text" placeholder="Enter product" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300">
                      <input type="number" placeholder="0" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300">
                      <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Nos</option>
                        <option>Kg</option>
                        <option>Litre</option>
                        <option>Meter</option>
                        <option>Set</option>
                      </select>
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300">
                      <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>New</option>
                        <option>Replacement</option>
                        <option>Additional</option>
                      </select>
                    </td>
                    <td className="py-1.5 px-2 border border-gray-300 text-center">
                      <button type="button" className="p-1 text-red-500 hover:bg-red-50 rounded transition">
                        <Minus size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="button" className="flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
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
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>UPI</option>
                  <option>Credit Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Total Amount (₹)</label>
                <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Advance Amount (₹)</label>
                <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pending Amount (₹)</label>
                <input type="text" readOnly value="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-700 flex items-center gap-2 px-4 py-2.5 text-white font-semibold text-sm">
              <MessageSquare size={16} />
              <h3>Visit Notes / Discussion</h3>
            </div>
            <div className="p-4">
              <textarea rows={5} placeholder="Write your visit notes, discussion points, observations..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
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
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition"
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
          <button type="button" className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <RotateCcw size={16} />
            Reset Form
          </button>
          <button type="submit" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            <Save size={16} />
            Submit Visit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisit;
