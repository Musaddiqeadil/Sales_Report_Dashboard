import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  { icon: LayoutDashboard, label: "Dashboard", path: "/", color: "text-blue-600" },
  { icon: PlusCircle, label: "Add Visit", path: "/add-visit", color: "text-green-600" },
  { icon: FileText, label: "Report List", path: "/reports", color: "text-blue-500" },
  { icon: Users, label: "Clients", path: "/clients", color: "text-gray-800" },
  { icon: Briefcase, label: "Projects", path: "/projects", color: "text-red-500" },
  { icon: Package, label: "Products", path: "/products", color: "text-purple-600" },
  { icon: CreditCard, label: "Payments", path: "/payments", color: "text-violet-600" },
  { icon: UserRound, label: "Team", path: "/team", color: "text-slate-800" },
  { icon: BarChart3, label: "Analytics", path: "/analytics", color: "text-amber-500" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="hidden md:flex flex-wrap items-center justify-center gap-10 px-6 py-4">
        {navItems.map(({ icon: Icon, label, path, color }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center gap-2 transition ${
              location.pathname === path
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <Icon size={20} className={location.pathname === path ? "text-blue-600" : color} />
            <span className="font-semibold">{label}</span>
          </Link>
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
          {navItems.map(({ icon: Icon, label, path, color }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-5 py-3 transition ${
                location.pathname === path
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} className={location.pathname === path ? "text-blue-600" : color} />
              <span className="font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
