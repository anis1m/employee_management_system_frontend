"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import api from "@/Functions/AxiosFunction";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Employee {
  Id: number;
  EmployeeId: string;
  Name: string;
  Email: string;
  Phone: string;
  Department: string;
  Designation: string;
  Salary: number;
  JoiningDate: string;
  Status: "Active" | "Inactive";
  Role: string;
  ReportingManager: string;
  ProfileImage: string;
}

export default function Roles() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const status = ["Active", "Inactive"];
  useEffect(() => {
    api
      .get("/api/employee/getallemployeesforrolesassign")
      .then((res) => {
        setEmployees(
          res.data.data?.map((x: any) => ({
            ...x,
            ProfileImage: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${x.ProfileImage}`,
            Department: x.Department?.Name ?? "",
            Role: x.Role?.Name ?? "",
            ReportingManager: x.ReportingManager?.Email ?? "",
          }))
        );
      })
      .catch(console.log);
  }, []);
  return (
    <div className="flex w-[100vw] h-[100vh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <div className="basis-[80%] flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        {/* Header */}
        <div className="basis-[10%] flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
            <p className="text-gray-500">Manage employee information</p>
          </div>
        </div>

        {/* Table */}
        <div className="w-full basis-[80%] overflow-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">Profile</th>
                <th className="px-6 py-4 text-left">Employee ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Designation</th>
                <th className="px-6 py-4 text-left">Salary</th>
                <th className="px-6 py-4 text-left">Joining Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Reporting Manager</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.EmployeeId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={emp.ProfileImage}
                      alt={emp.Name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">{emp.EmployeeId}</td>

                  <td className="px-6 py-4">{emp.Name}</td>

                  <td className="px-6 py-4">{emp.Email}</td>

                  <td className="px-6 py-4">{emp.Phone}</td>

                  <td className="px-6 py-4">{emp.Department}</td>

                  <td className="px-6 py-4">{emp.Designation}</td>

                  <td className="px-6 py-4">₹{emp.Salary}</td>

                  <td className="px-6 py-4">{emp.JoiningDate}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        Number(emp.Status) === 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status[Number(emp.Status)]}
                    </span>
                  </td>

                  <td className="px-6 py-4">{emp.Role}</td>

                  <td className="px-6 py-4">{emp.ReportingManager}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-600 hover:bg-yellow-200"
                        onClick={() => {
                          router.push(`/Auth/Dashboard/Roles/Add?id=${emp.Id}`);
                        }}
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
