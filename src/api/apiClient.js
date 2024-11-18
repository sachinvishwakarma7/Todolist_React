import axios from "axios";

export const BASE_URL = "https://todolist-api-cyan.vercel.app";

const apiClient = axios.create({
  baseURL: BASE_URL, // Add your API base URL in .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
