import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, 
});

api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("user-info"); // Retrieve 'user-info' from localStorage
    if (userInfo) {
      const token = JSON.parse(userInfo)?.token; // Parse and extract the token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API call to authenticate with Google
export const googleAuth = (code) => api.get(`/api/auth/google?code=${code}`);

// Export the `api` instance for general use
export default api;
