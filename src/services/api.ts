import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.API_URL ||
    "https://workshopsapp-production.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
