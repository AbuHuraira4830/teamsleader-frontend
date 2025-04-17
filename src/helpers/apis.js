import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.baseURL = "https://teaamsleader-backend.onrender.com/";
// axios.defaults.baseURL =
//   "https://miketeamsleaderbackend-a03d0e00169c.herokuapp.com";
// axios.defaults.headers.common["Authorization"] =
//   localStorage.getItem("token") || "";


export const postAPI = async (url, data) => {
  let response = await axios.post(url, data); 
  return response;
};

export const getAPI = async (url) => {
  let response = await axios.get(url);
  return response;
};
