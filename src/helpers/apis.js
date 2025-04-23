import axios from "axios";

// Use the backend base URL
axios.defaults.baseURL = "https://teaamsleader-backend.onrender.com";

// Optionally include token if you’re using it:
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") || "";

// POST helper
export const postAPI = async (url, data) => {
  const response = await axios.post(url, data);
  return response;
};

// GET helper
export const getAPI = async (url) => {
  const response = await axios.get(url);
  return response;
};

// ✅ NEW: PUT helper
export const putAPI = async (url, data) => {
  const response = await axios.put(url, data);
  return response;
};

// ✅ NEW: DELETE helper
export const deleteAPI = async (url) => {
  const response = await axios.delete(url);
  return response;
};
