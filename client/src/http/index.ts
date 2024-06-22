import axios from "axios";
import AuthResponse from "../models/response/AuthResponse";

const BASE_URL = "http://localhost:2909/api";

const $api = axios.create({
  // automatic attachment of cookies to requests
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  function (config) {
    return config;
  },
  async (error) => {
    try {
      const originalRequest = error.config;
      console.log(originalRequest);
      console.log(error.response.status);

      if (
        error.response.status == 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default $api;
