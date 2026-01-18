import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  BedDouble,
  CheckCircle2,
  CalendarRange,
  ChevronDown,
} from "lucide-react";

const AdminMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const adminLinks = [
    {
      label: "Manage Rooms",
      icon: <BedDouble size={18} />,
      path: "/admin/rooms",
    },
    {
      label: "Approve Bookings",
      icon: <CheckCircle2 size={18} />,
      path: "/admin/approve",
    },
    {
      label: "Occupancy Calendar",
      icon: <CalendarRange size={18} />,
      path: "/admin/calendar",
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
          isOpen
            ? "bg-amber-700 text-white border-amber-400 shadow-lg shadow-slate-200"
            : "bg-white text-slate-700 border-amber-200 hover:border-amber-500"
        }`}
      >
        <ShieldCheck
          size={18}
          className={isOpen ? "text-amber-200" : "text-amber-600"}
        />
        <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
          Admin Panel
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 z-70">
          <div className="px-4 py-2 border-b border-slate-50 mb-1">
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">
              Management
            </p>
          </div>

          {adminLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors group"
            >
              <span className="text-slate-400 group-hover:text-amber-600 transition-colors">
                {link.icon}
              </span>
              <span className="font-medium">{link.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
