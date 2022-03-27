import axios, { AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";
import router from "../router/index";
const Axios = axios.create({
  baseURL: "http://localhost:3001/",
});

Axios.interceptors.request.use(
  (conflg: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const con: any = conflg || {};
    if (token) {
      con.headers["Authorization"] = "Bearer " + token;
    }
    return conflg;
  },
  (error) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (conifg) => {
    return conifg;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status == 400) {
      message.error(error.response.data.message);
    }
    if (error.response.status == 401) {
      message.error("身份验证失败，请重新登录");
      router.push("/login");
    }
    return Promise.resolve(error);
  }
);

export { Axios };
