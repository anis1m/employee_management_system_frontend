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
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  active?: boolean;
  router: AppRouterInstance;
}

function SidebarItem({
  icon: Icon,
  text,
  active = false,
  router,
}: SidebarItemProps) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
        active
          ? "bg-blue-600 text-white shadow-lg"
          : "text-gray-300 hover:bg-slate-800 hover:text-white"
      }`}
      onClick={() => {
        switch (text) {
          case "Dashboard":
            router.push("/Auth/Dashboard");
            break;
          case "Employees":
            router.push("/Auth/Dashboard/Employees");
            break;
          case "Assign Roles":
            router.push("/Auth/Dashboard/Roles");
            break;
        }
      }}
    >
      <Icon size={20} />
      <span>{text}</span>
    </button>
  );
}

function Sidebar() {
  const router = useRouter();
  return (
    <aside className="basis-[20%] w-full h-full bg-slate-900 text-white shadow-xl">
      <div className="flex h-20 items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Employee
          <span className="text-blue-400">MS</span>
        </h1>
      </div>

      <nav className="space-y-2 p-4">
        <SidebarItem
          icon={LayoutDashboard}
          text="Dashboard"
          active
          router={router}
        />
        <SidebarItem icon={Users} text="Employees" router={router} />
        <SidebarItem icon={Building2} text="Assign Roles" router={router} />
        <SidebarItem icon={FileText} text="Profile" router={router} />
        <SidebarItem icon={Settings} text="Settings" router={router} />
      </nav>

      <div className="absolute bottom-5 w-64 px-4">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-500 transition"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
