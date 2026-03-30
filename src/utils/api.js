import axios from "axios";

// ✅ create instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

// ✅ request interceptor (attach token)
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

// ✅ response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔴 Unauthorized → logout
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🔴 Server error
    if (error.response?.status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);

export default api;