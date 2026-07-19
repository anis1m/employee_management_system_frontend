"use client";
import React from "react";
import {
  Bell,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  UserCheck,
  UserX,
  Users,
  LucideIcon,
} from "lucide-react";

function Navbar() {
  return (
    <header className="flex basis-[10%] items-center justify-between bg-white px-8 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="rounded-xl bg-slate-100 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Bell size={22} className="cursor-pointer text-slate-600" />

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=13"
            alt="Admin"
            className="h-10 w-10 rounded-full"
          />

          <div>
            <h4 className="font-semibold">Admin</h4>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
