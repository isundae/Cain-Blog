import { Axios } from "./axios";

export const get = async (url: string, params?: any) => {
  return await Axios.get(url, { params: params });
};

export const post = async (url: string, data?: any) => {
  return await Axios.post(url, data);
};
