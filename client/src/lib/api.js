import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Interceptors for Handling Authentication Tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");

      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await api.post("/auth/refresh-token", {
            refreshToken,
          });
          localStorage.setItem("accessToken", data.accessToken);

          // Retry the failed request
          return api.request(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

// Create Axios Base Query for RTK Query
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
