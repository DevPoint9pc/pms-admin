import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const localData = localStorage.getItem("app-storage");
  const parseData = localData ? JSON.parse(localData) : null;
  const token = parseData?.state?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiInstance;
