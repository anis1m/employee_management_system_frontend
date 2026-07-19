"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import api from "@/Functions/AxiosFunction";
import { Asterisk } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface Department {
  Name: string;
}

interface Role {
  Name: string;
}

interface ReportingManager {
  Id: string;
  Name: string;
}

interface PayloadType {
  EmployeeId: string;
  Name: string;
  Email: string;
  Phone: string;
  Department: Department;
  Designation: string;
  Salary: string;
  Role: Role;
  JoiningDate: string;
  Status: string;
  ReportingManager: ReportingManager;
  ProfileImage: File | null;
  ProfileImageLink: string;
  Password: string;
}
function AddNewEmployee() {
  const params = useSearchParams();
  const id = params.get("id");
  const [Payload, SetPayload] = useState<PayloadType>({
    EmployeeId: "",
    Name: "",
    Email: "",
    Phone: "",
    Department: {
      Name: "",
    },
    Designation: "",
    Salary: "",
    Role: {
      Name: "",
    },
    JoiningDate: "",
    Status: "",
    ReportingManager: {
      Id: "",
      Name: "",
    },
    ProfileImage: null,
    ProfileImageLink: "",
    Password: "",
  });
  const [reportingManagers, setReportingManagers] = useState([]);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    SetPayload({
      ...Payload,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData();
    if (id) {
      formdata.append("Id", id);
    }
    formdata.append("EmployeeId", Payload.EmployeeId);
    formdata.append("Name", Payload.Name);
    formdata.append("Email", Payload.Email);
    formdata.append("Phone", Payload.Phone);
    formdata.append("Department.Name", Payload.Department.Name);
    formdata.append("Designation", Payload.Designation);
    formdata.append("Salary", Payload.Salary);
    if (Payload.JoiningDate) {
      formdata.append("JoiningDate", Payload.JoiningDate);
    }
    formdata.append("Status", Payload.Status);
    if (Payload.ReportingManager.Id) {
      formdata.append("ReportingManager.Id", Payload.ReportingManager.Id);
    }
    if (Payload.ProfileImage) {
      formdata.append("ProfileImage", Payload.ProfileImage);
    }
    formdata.append("Password", Payload.Password);

    if (id) {
      api
        .put("/api/employee", formdata, {
          headers: {
            "Content-Type": "application/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message,
          });
        });
    } else {
      api
        .post("/api/employee", formdata, {
          headers: {
            "Content-Type": "application/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(console.log);
    }
  }

  useEffect(() => {
    if (id) {
      api
        .post(`/api/employee/${id}`, {})
        .then((res) => {
          const employee = res.data.data;
          SetPayload({
            EmployeeId: employee.EmployeeId,
            Name: employee.Name,
            Email: employee.Email,
            Phone: employee.Phone,
            Designation: employee.Designation,
            Salary: employee.Salary,
            JoiningDate: employee.JoiningDate,
            Status: employee.Status,
            ProfileImageLink: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${employee.ProfileImage}`,
            ProfileImage: null,
            Password: employee.Password,
            ReportingManager: {
              Id: "",
              Name: "",
            },
            Role: {
              Name: "",
            },
            Department: {
              Name: "",
            },
          });
        })
        .catch(console.log);
    }
  }, [id]);

  useEffect(() => {
    api
      .get("/api/employee/reporting-managers")
      .then((res) => {
        setReportingManagers(res.data.data);
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
        <div className="basis-[90%] overflow-auto bg-gray-100 py-10">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">
                Employee Registration
              </h1>
              <p className="mt-1 text-blue-100">
                Add a new employee to the organization.
              </p>
            </div>

            <form className="p-8" onSubmit={handleSubmit}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Side - Profile Image */}
                <div className="flex flex-col items-center">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border-4 border-dashed border-gray-300 bg-gray-100">
                    <span className="text-center text-gray-500">
                      Upload
                      <br />
                      Profile Image
                    </span>
                  </div>

                  <input
                    type="file"
                    className="mt-5 w-full rounded-lg border p-2 text-sm"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      SetPayload({
                        ...Payload,
                        ProfileImage: e.target.files?.[0] ?? null,
                      });
                    }}
                  />
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-2">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Employee Id"
                        value={Payload.EmployeeId}
                        name="EmployeeId"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Name"
                        name="Name"
                        onChange={handleChange}
                        value={Payload.Name}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Email
                        <Asterisk className="h-4 w-4 text-red-500 inline-block" />
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Email"
                        required
                        name="Email"
                        onChange={handleChange}
                        value={Payload.Email}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Phone
                        <Asterisk className="h-4 w-4 text-red-500 inline-block" />
                      </label>
                      <input
                        type="tel"
                        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Phone"
                        required
                        name="Phone"
                        onChange={handleChange}
                        value={Payload.Phone}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Department
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border p-3"
                        placeholder="Enter Department"
                        onChange={(e) => {
                          SetPayload({
                            ...Payload,
                            Department: {
                              Name: e.target.value,
                            },
                          });
                        }}
                        value={Payload.Department.Name}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Designation
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border p-3"
                        placeholder="Enter Designation"
                        name="Designation"
                        onChange={handleChange}
                        value={Payload.Designation}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Salary
                        <Asterisk className="h-4 w-4 text-red-500 inline-block" />
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border p-3"
                        placeholder="Enter Salary"
                        required
                        name="Salary"
                        onChange={handleChange}
                        value={Payload.Salary}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-lg border p-3"
                        placeholder="Enter Date"
                        name="JoiningDate"
                        onChange={handleChange}
                        value={Payload.JoiningDate}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Status
                      </label>
                      <select
                        className="w-full rounded-lg border p-3"
                        name="Status"
                        onChange={handleChange}
                        value={Payload.Status}
                      >
                        <option value="">Select Status</option>
                        <option value="0">Active</option>
                        <option value="1">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Reporting Manager
                      </label>
                      <select
                        className="w-full rounded-lg border p-3"
                        name="ReportingManager"
                        onChange={(e) => {
                          SetPayload({
                            ...Payload,
                            ReportingManager: {
                              Id: e.target.value,
                              Name: "",
                            },
                          });
                        }}
                        value={Payload.ReportingManager.Id}
                      >
                        <option value="">Select Reporting Manager</option>
                        {reportingManagers?.map((x: any) => (
                          <option value={x.Id}>{x.Name || x.Email}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Password
                        <Asterisk className="h-4 w-4 text-red-500 inline-block" />
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border p-3"
                        placeholder="Enter Password"
                        required
                        name="Password"
                        onChange={handleChange}
                        value={Payload.Password}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-10 flex justify-end gap-4">
                    <button
                      type="reset"
                      className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                    >
                      {id ? "Update Employee" : "Save Employee"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewEmployee;
