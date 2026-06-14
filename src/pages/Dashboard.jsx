import { useState } from "react";
import InfoCard from "../components/common/InfoCard";
import DetailRow from "../components/common/DetailRow";
import {
  visitInformation,
  clientInformation,
  productDemands,
  productDemandDescription,
  projectInformation,
  paymentInformation,
  paymentModules,
  salaryAllocation,
  visitNotes,
  attachments,
  otherInformation,
  reportList,
} from "../data/dashboardData";
import {
  ClipboardList,
  User,
  MapPin,
  RefreshCw,
  Navigation,
  CheckCircle,
  Package,
  Wallet,
  Briefcase,
  Camera,
  ZoomIn,
  ZoomOut,
  CreditCard,
  IndianRupee,
  MessageSquare,
  Paperclip,
  Upload,
  Download,
  Trash2,
  Info,
  FileText,
  Search,
  Image,
  FileSpreadsheet,
  Eye,
  ShieldCheck,
} from "lucide-react";
import mapView from "../assets/map-view.png";
import officeBuilding from "../assets/office-building.jpg";

const Dashboard = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <InfoCard
          title="Visit Information"
          icon={ClipboardList}
          headerColor="bg-blue-900"
        >
          <div className="p-4">
            {visitInformation.map((item) => (
              <DetailRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Client Information"
          icon={User}
          headerColor="bg-green-700"
        >
          <div className="p-4">
            {clientInformation.map((item) => (
              <DetailRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Visit Location & GPS"
          icon={MapPin}
          headerColor="bg-purple-700"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">GPS Location</h4>

                <p className="text-sm text-gray-600">26.8467° N, 80.9462° E</p>
              </div>

              <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                <CheckCircle size={14} />
                GPS Captured
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <img
                src={mapView}
                alt="Map View"
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">
                Captured at:
                <span className="ml-2 font-normal text-gray-600">
                  20/05/2025 11:45 AM
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition">
                <RefreshCw size={16} />
                Refresh Location
              </button>

              <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition">
                <Navigation size={16} />
                Open in Maps
              </button>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Products Demand Details"
          icon={Package}
          headerColor="bg-amber-700"
        >
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-2">Product Name</th>

                    <th className="text-center py-2">Quantity</th>

                    <th className="text-center py-2">Demand Type</th>
                  </tr>
                </thead>

                <tbody>
                  {productDemands.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.product}</td>

                      <td className="text-center">{item.quantity}</td>

                      <td className="text-center">{item.demandType}</td>
                    </tr>
                  ))}

                  <tr className="font-semibold bg-gray-50">
                    <td className="py-2">Total Products</td>

                    <td className="text-center">{productDemands.length}</td>

                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">
                Products Demand Description
              </h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                {productDemandDescription}
              </p>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Project Information"
          icon={Briefcase}
          headerColor="bg-blue-700"
        >
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">
                What They Want to Build
              </h4>

              <div className="border rounded-md p-3 bg-white">
                Complete Business Management System with Website and Mobile App
              </div>
            </div>

            <div>
              <DetailRow label="Project Incharge" value="Vikash Gupta" />
            </div>

            <div>
              <DetailRow
                label="Project Incharge Contact"
                value="+91 9123456780"
              />
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3">
                Who is Working on Project
              </h4>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>2 Developers</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>1 UI/UX Designer</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>1 Tester</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>1 Project Manager</span>
                </div>
              </div>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Visit Photo (Clear & Zoomable)"
          icon={Camera}
          headerColor="bg-sky-900"
        >
          <div className="p-4">
            <div className="relative border rounded-lg overflow-hidden">
              <img
                src={officeBuilding}
                alt="Office Building"
                className="w-full object-contain"
                style={{
                  transform: `scale(${zoom})`,
                  transition: "transform 0.3s ease",
                }}
              />

              <div className="absolute top-3 right-3 flex flex-col z-10">
                <button
                  className="bg-white p-2 border rounded-t-lg hover:bg-gray-100 transition"
                  onClick={handleZoomIn}
                >
                  <ZoomIn size={18} />
                </button>

                <button
                  className="bg-white p-2 border border-t-0 rounded-b-lg hover:bg-gray-100 transition"
                  onClick={handleZoomOut}
                >
                  <ZoomOut size={18} />
                </button>
              </div>

              {zoom > 1 && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {Math.round(zoom * 100)}%
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-green-600 font-medium text-sm">
                ✓ Clear Photo
              </span>

              <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                Retake Photo
              </button>
            </div>
          </div>
        </InfoCard>
        <InfoCard
          title="Payment Information"
          icon={Wallet}
          headerColor="bg-violet-800"
        >
          <div className="p-4">
            {paymentInformation.map((item) => (
              <DetailRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}

            <div className="grid grid-cols-2 py-2 border-b">
              <span className="text-sm font-semibold text-gray-700">
                Payment Status
              </span>

              <span className="text-sm text-left">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  Partial Paid
                </span>
              </span>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Payment Module Wise Breakup"
          icon={CreditCard}
          headerColor="bg-orange-600"
        >
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">Module</th>

                    <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">Amount (₹)</th>

                    <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">Received (₹)</th>

                    <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">Pending (₹)</th>

                    <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {paymentModules.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="py-2 px-3 border border-gray-300">{item.module}</td>

                      <td className="py-2 px-3 text-right border border-gray-300">
                        {item.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="py-2 px-3 text-right border border-gray-300">
                        {item.received.toLocaleString("en-IN")}
                      </td>

                      <td className="py-2 px-3 text-right border border-gray-300">
                        {item.pending.toLocaleString("en-IN")}
                      </td>

                      <td className="py-2 px-3 text-center border border-gray-300">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded border ${
                            item.status === "Partial"
                              ? "bg-yellow-50 text-yellow-600 border-yellow-500"
                              : item.status === "Pending"
                              ? "bg-red-50 text-red-600 border-red-500"
                              : "bg-green-50 text-green-600 border-green-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  <tr className="font-bold bg-gray-100">
                    <td className="py-2 px-3 border border-gray-300">Total</td>

                    <td className="py-2 px-3 text-right border border-gray-300">
                      {paymentModules
                        .reduce((sum, item) => sum + item.amount, 0)
                        .toLocaleString("en-IN")}
                    </td>

                    <td className="py-2 px-3 text-right border border-gray-300">
                      {paymentModules
                        .reduce((sum, item) => sum + item.received, 0)
                        .toLocaleString("en-IN")}
                    </td>

                    <td className="py-2 px-3 text-right border border-gray-300">
                      {paymentModules
                        .reduce((sum, item) => sum + item.pending, 0)
                        .toLocaleString("en-IN")}
                    </td>

                    <td className="py-2 px-3 border border-gray-300"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Salary Allocation (Project Wise)"
          icon={IndianRupee}
          headerColor="bg-green-700"
        >
          <div className="p-4">
            {salaryAllocation.map((item) => (
              <DetailRow
                key={item.role}
                label={item.role}
                value={item.amount}
              />
            ))}

            <div className="mt-3 pt-3 border-t-2 border-gray-300">
              <DetailRow
                label="Total Salary Cost"
                value={`₹ ${salaryAllocation
                  .reduce(
                    (sum, item) =>
                      sum +
                      parseInt(item.amount.replace(/[₹ ,]/g, "")),
                    0
                  )
                  .toLocaleString("en-IN")}`}
              />
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Visit Notes / Discussion"
          icon={MessageSquare}
          headerColor="bg-gray-700"
        >
          <div className="p-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {visitNotes}
            </p>
          </div>
        </InfoCard>

        <InfoCard
          title="Attachments"
          icon={Paperclip}
          headerColor="bg-cyan-700"
        >
          <div className="p-4">
            <button className="flex items-center gap-2 border border-blue-500 text-blue-600 rounded-lg px-3 py-1.5 text-sm font-medium mb-4">
              <Upload size={14} />
              Upload Files
            </button>

            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    {file.type === "pdf" ? (
                      <FileText size={18} className="text-red-500" />
                    ) : file.type === "docx" ? (
                      <FileText size={18} className="text-blue-500" />
                    ) : (
                      <Image size={18} className="text-green-500" />
                    )}

                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {file.name}
                      </p>

                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-blue-100 rounded transition">
                      <Download size={16} className="text-blue-600" />
                    </button>

                    <button className="p-1 hover:bg-red-100 rounded transition">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InfoCard>

        <InfoCard
          title="Other Information"
          icon={Info}
          headerColor="bg-orange-700"
        >
          <div className="p-4">
            {otherInformation.map((item) => (
              <DetailRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}

            <div className="grid grid-cols-2 py-2">
              <span className="text-sm font-semibold text-gray-700">
                Priority
              </span>

              <span className="text-sm text-right">
                <span className="px-3 py-1 text-xs font-semibold rounded border bg-yellow-50 text-yellow-600 border-yellow-500">
                  High
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 py-2">
              <span className="text-sm font-semibold text-gray-700">
                Probability
              </span>

              <span className="text-sm text-right">
                <span className="px-3 py-1 text-xs font-semibold rounded bg-green-500 text-white">
                  80%
                </span>
              </span>
            </div>
          </div>
        </InfoCard>
      </div>

      <div className="mt-6">
        <InfoCard
          title="Report List (Employee Wise)"
          icon={ClipboardList}
          headerColor="bg-slate-800"
        >
          <div className="p-3 md:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  From Date
                </label>

                <input
                  type="date"
                  defaultValue="2025-05-01"
                  className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  To Date
                </label>

                <input
                  type="date"
                  defaultValue="2025-05-20"
                  className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sales Executive
                </label>

                <select className="border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>All Employees</option>
                  <option>Rahul Kumar</option>
                  <option>Priya Singh</option>
                  <option>Amit Sharma</option>
                </select>
              </div>

              <button className="flex items-center gap-1.5 bg-blue-600 text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-blue-700 transition">
                <Search size={14} />
                Search
              </button>

              <button className="flex items-center gap-1.5 bg-green-600 text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-green-700 transition">
                <FileSpreadsheet size={14} />
                Export Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      #
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Date
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Time
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Sales Executive
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Client Name
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Contact No.
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Project Type
                    </th>

                    <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">
                      Products
                    </th>

                    <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">
                      Total Value (₹)
                    </th>

                    <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">
                      Advance (₹)
                    </th>

                    <th className="py-2.5 px-3 text-right text-xs font-bold border border-gray-300">
                      Pending (₹)
                    </th>

                    <th className="py-2.5 px-3 text-left text-xs font-bold border border-gray-300">
                      Payment Type
                    </th>

                    <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">
                      Status
                    </th>

                    <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">
                      Location
                    </th>

                    <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">
                      Photo
                    </th>

                    <th className="py-2.5 px-3 text-center text-xs font-bold border border-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reportList.map((item) => (
                    <tr key={item.sno} className="bg-white">
                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.sno}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.date}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.time}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.salesExecutive}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.clientName}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.contactNo}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.projectType}
                      </td>

                      <td className="py-2.5 px-3 text-center border border-gray-300">
                        {item.products}
                      </td>

                      <td className="py-2.5 px-3 text-right border border-gray-300">
                        {item.totalValue}
                      </td>

                      <td className="py-2.5 px-3 text-right border border-gray-300">
                        {item.advance}
                      </td>

                      <td className="py-2.5 px-3 text-right border border-gray-300">
                        {item.pending}
                      </td>

                      <td className="py-2.5 px-3 border border-gray-300">
                        {item.paymentType}
                      </td>

                      <td className="py-2.5 px-3 text-center border border-gray-300">
                        <span
                          className={`text-sm font-bold ${
                            item.status === "Paid"
                              ? "text-green-600"
                              : "text-gray-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-center border border-gray-300">
                        <MapPin
                          size={16}
                          className="text-blue-600 mx-auto"
                        />
                      </td>

                      <td className="py-2.5 px-3 text-center border border-gray-300">
                        <Camera
                          size={16}
                          className="text-blue-600 mx-auto"
                        />
                      </td>

                      <td className="py-2.5 px-3 text-center border border-gray-300">
                        <button className="text-blue-600 border border-blue-600 rounded px-2.5 py-0.5 text-xs font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-orange-500 font-medium">
              <ShieldCheck size={16} className="text-orange-500" />

              <span>
                All reports are GPS verified with date, time & photo to ensure
                transparency and avoid any misuse.
              </span>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default Dashboard;
