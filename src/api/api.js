import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (
      originalRequest.url &&
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      isRefreshing = true;
      try {
        console.log("Attempting refresh-token, cookies:", document.cookie);
        const response = await axios.post(
          `${API.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        console.log("refresh-token response", response.status, response.data);
        const newToken = response.data.access_token;
        if (!newToken) throw new Error("No token from refresh");
        setAuthHeader(newToken);
        localStorage.setItem("access_token", newToken);
        processQueue(null, newToken);
        isRefreshing = false;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (error) {
        processQueue(error, null);
        isRefreshing = false;
        setAuthHeader(null);
        localStorage.removeItem("access_token");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
