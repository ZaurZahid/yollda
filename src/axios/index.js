// axiosInstance.js
import axios from "axios";
import { localStorageUtil } from "../utils/localStorage";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Attach access token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorageUtil.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorageUtil.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // Send refresh request with token from localStorage
        const res = await axios.post(
          `${API_URL}/api/v1/account/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const { access } = res.data;
        if (access) localStorageUtil.updateTokens(access);
        // if (refresh) localStorage.setItem("refreshToken", refresh);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        // Refresh also failed
        localStorageUtil.removeTokens();
        window.location.href = "/signup";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
