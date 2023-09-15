import axios from "axios";
import toastr from "toastr";
export const APP_ID = "8d348a62ee12b2bb05648ea0a4a52078";
export const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const defaultHeaders = {
  "Content-type": "application/json",
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

const instance = axios.create({
  baseURL: BASE_URL,
  rejectUnauthorized: false,
  headers: {
    ...defaultHeaders,
  },
});

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    toastr.error(error.message, {
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
      positionClass: "toast-top-right",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    });
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
