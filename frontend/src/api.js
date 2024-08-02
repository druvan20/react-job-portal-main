// src/api.js
import axios from "axios";

// Create an Axios instance with default configuration
const API = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Your backend base URL
  withCredentials: true, // Ensure cookies are sent with requests
});

export default API;
