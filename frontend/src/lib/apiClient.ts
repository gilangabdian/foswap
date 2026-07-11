import axios from "axios";

// Ambil URL dari environment (.env.local)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor jika nanti ada token (JWT)
apiClient.interceptors.request.use(
  (config) => {
    // Misalnya, ambil token dari cookie atau localStorage
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
