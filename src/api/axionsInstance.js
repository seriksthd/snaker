import axios from "axios";

export const axionsInstance = axios.create({
  baseURL: "https://cf2a8e141d38d42b.mokky.dev",
  timeout: 1000,
  headers: {
    Accept: "appLication/json",
  },
});
