import axios from "axios";
import { Config } from "./config";

export const HttpRequest = axios.create({
  baseURL: Config.baseUrl,
});

HttpRequest.interceptors.request.use(
  async (config) => {
    if (config.method === "POST") {
      config.headers = Config.defaultHeader;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

HttpRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response || !error.response.status) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      alert("Unauthorized Access!");
    } else if (error.response.status === 404) {
      alert("API Not Found!");
    }
    return Promise.reject(error);
  }
);
