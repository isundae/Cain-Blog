import { Login, FindUser } from "./api";
import { post } from "../utils/axios-request";
import router from "../router/index";
import { message } from "ant-design-vue";
import vuex from "../store/index";
export const login = async (body: { adminname: string; adminpass: string }) => {
  const { data } = await post(Login, body);
  localStorage.setItem("token", data.token);
  const user = await FindUserfuc();
  vuex.commit("setIsLogin", true);
  vuex.commit("setUser", user);
  message.success("登录成功");
  router.push("/");
};

export const FindUserfuc = async () => {
  const { data } = await post(FindUser);
  return data;
};
