import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ✅ ATTACH TOKEN SAFELY */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ❌ REMOVE AUTO-LOGOUT */
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // DO NOT force logout for complaints
    return Promise.reject(err);
  }
);

export default API;
