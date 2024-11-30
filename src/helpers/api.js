import axios from "axios";

axios.defaults.baseURL =
  "https://miketeamsleaderbackend-554bc9bdf5c9.herokuapp.com/";
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
