"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import api from "@/Functions/AxiosFunction";
import { Asterisk } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Role {
  Id: number;
  Name?: string;
  ProfileImage?: string;
}

function AddNewEmployee() {
  const params = useSearchParams();
  const id = params.get("id");
  const [Payload, SetPayload] = useState<Role>({
    Id: 0,
    Name: "",
    ProfileImage: "",
  });
  const [roles, setRoles] = useState([]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData();
    if (id) {
      formdata.append("Id", id);
      formdata.append("Role.Id", String(Payload.Id));
    }

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
        .catch(console.log);
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
            Id: employee.Role.Id,
            Name: employee.Role.Name,
            ProfileImage: `${process.env.NEXT_PUBLIC_API_URL}/uploads/${employee.ProfileImage}`,
          });
        })
        .catch(console.log);
    }
  }, [id]);

  useEffect(() => {
    api
      .get("/api/roles")
      .then((res) => {
        setRoles(res.data.data);
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
                    {Payload.ProfileImage ? (
                      <span className="text-center text-gray-500">
                        No
                        <br />
                        Profile Image
                      </span>
                    ) : (
                      <img
                        src={Payload.ProfileImage}
                        width={300}
                        height={300}
                      ></img>
                    )}
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-2">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Role
                      </label>
                      <select
                        className="w-full rounded-lg border p-3"
                        name="ReportingManager"
                        onChange={(e) => {
                          SetPayload({
                            Id: Number(e.target.value || "0"),
                          });
                        }}
                        value={Payload.Id}
                      >
                        <option value="">Select Role</option>
                        {roles?.map((x: any) => (
                          <option value={x.Id}>{x.Name}</option>
                        ))}
                      </select>
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
