import axios from "axios";

// axios.defaults.baseURL =
//   "https://miketeamsleaderbackend-a03d0e00169c.herokuapp.com";
axios.defaults.baseURL = "http://localhost:8888";
// axios.defaults.baseURL = "https://teaamsleader-backend.onrender.com/";
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("token") || "";

export const postAPI = async (url, data) => {
  let response = await axios.post(url, data);
  return response;
};

export const getAPI = async (url) => {
  let response = await axios.get(url);
  return response;
};

export const putAPI = async (url, data) => {
  const response = await axios.put(url, data);
  return response;
};

// ✅ NEW: DELETE helper
export const deleteAPI = async (url) => {
  const response = await axios.delete(url);
  return response;
};