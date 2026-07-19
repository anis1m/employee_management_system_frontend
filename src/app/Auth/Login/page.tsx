"use client";

import api from "@/Functions/AxiosFunction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [payload, setpayload] = useState({
    Email: "",
    Password: "",
  });

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    api
      .post("/api/auth/login", payload)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.data);
        router.push("/Auth/Dashboard");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err?.response?.data?.message,
        });
      });
  }
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                ✨
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-center text-white">
              Welcome Back
            </h1>
            <p className="text-center text-gray-200 mt-2">
              Sign in to your account
            </p>

            {/* Form */}
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={(e) => {
                  setpayload({
                    ...payload,
                    Email: e.target.value,
                  });
                }}
                required
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={(e) => {
                  setpayload({
                    ...payload,
                    Password: e.target.value,
                  });
                }}
                required
              />

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
