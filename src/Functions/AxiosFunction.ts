// lib/axios.js
import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      await Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        confirmButtonText: "OK",
      });

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
