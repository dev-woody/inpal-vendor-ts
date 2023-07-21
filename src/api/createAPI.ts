import axios from "axios";
import { useNavigate } from "react-router-dom";

export const client = axios.create({
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const accessClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

accessClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // 인증 에러 발생시
    // const localStorageGet = localStorage.getItem("user");
    // const localVendorData = localStorageGet && JSON.parse(localStorageGet);
    if (error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;
        const data = await axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
          url: "/vendor/admin/refreshToken",
          params: {
            grant_type: `refresh_token`,
          },
        });
        if (data) {
          const access_token = data.data.data;
          localStorage.removeItem("access_token");
          localStorage.setItem("access_token", access_token);
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return await accessClient.request(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
