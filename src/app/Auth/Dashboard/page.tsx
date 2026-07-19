import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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

interface StatCard {
  title: string;
  value: number;
  icon: LucideIcon;
  bg: string;
  iconColor: string;
  border: string;
}

const stats: StatCard[] = [
  {
    title: "Total Employees",
    value: 250,
    icon: Users,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-500",
  },
  {
    title: "Active Employees",
    value: 220,
    icon: UserCheck,
    bg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-green-500",
  },
  {
    title: "Inactive Employees",
    value: 30,
    icon: UserX,
    bg: "bg-red-100",
    iconColor: "text-red-600",
    border: "border-red-500",
  },
  {
    title: "Departments",
    value: 12,
    icon: Building2,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "border-orange-500",
  },
];

export default function Dashboard() {
  return (
    <div className="flex w-[100vw] h-[100vh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <div className="basis-[80%] overflow-hidden flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Content */}
        <main className="basis-[90%] overflow-auto p-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back 👋</h1>

          <p className="mt-2 text-gray-500">Employee Management Dashboard</p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border-l-4 ${item.border} bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">{item.title}</p>

                      <h2 className="mt-3 text-4xl font-bold text-slate-800">
                        {item.value}
                      </h2>

                      <p className="mt-4 text-sm font-medium text-green-600">
                        ↑ Updated Today
                      </p>
                    </div>

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg}`}
                    >
                      <Icon size={34} className={item.iconColor} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
