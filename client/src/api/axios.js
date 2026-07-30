import axios from "axios";

const API = axios.create({
  baseURL: "https://online-voting-system-4rvm.onrender.com/api",
});

export default API;