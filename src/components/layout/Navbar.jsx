import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Users,
  Briefcase,
  Package,
  CreditCard,
  UserRound,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", color: "text-blue-600" },
  { icon: PlusCircle, label: "Add Visit", color: "text-green-600" },
  { icon: FileText, label: "Report List", color: "text-blue-500" },
  { icon: Users, label: "Clients", color: "text-gray-800" },
  { icon: Briefcase, label: "Projects", color: "text-red-500" },
  { icon: Package, label: "Products", color: "text-purple-600" },
  { icon: CreditCard, label: "Payments", color: "text-violet-600" },
  { icon: UserRound, label: "Team", color: "text-slate-800" },
  { icon: BarChart3, label: "Analytics", color: "text-amber-500" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="hidden md:flex flex-wrap items-center justify-center gap-10 px-6 py-4">
        {navItems.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <Icon size={20} className={color} />
            <span className="font-semibold">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <span className="font-semibold text-gray-700">Menu</span>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-lg text-gray-800">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col py-2">
          {navItems.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition"
            >
              <Icon size={20} className={color} />
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
