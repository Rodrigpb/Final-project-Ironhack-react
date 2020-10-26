import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010";
axios.defaults.withCredentials = true; // Very important so that cookies will be set and sent with every request

export const login = (email, password) => {
  return axios.post("/login", { email, password }).then((res) => res.data);
};

export const getProducts = () => {
  return axios.get("/product").then((res) => res.data);
};

// Add whatever API calls you need here
