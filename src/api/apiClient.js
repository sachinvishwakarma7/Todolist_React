import axios from "axios";

export const BASE_URL = "https://todolist-api-cyan.vercel.app";
// export const BASE_URL = "http://localhost:3005";

const apiClient = axios.create({
  baseURL: BASE_URL, // Add your API base URL in .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
