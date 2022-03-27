import { Links, LinksDelete, LinksUpdate } from "./api";
import { get, post } from "../utils/axios-request";

interface Linkx {
  title: string;
  path:string
}

export const LinkFindAll = async (params: any) => {
  const { data } = await get(Links, params);
  return data;
};

export const LinkCreate = async (body: Linkx) => {
  const { data } = await post(Links, body);
  return data;
};

export const LinkDelete = async (id: string) => {
  const { data } = await post(`${LinksDelete}/${id}`);
  return data;
};

export const LinkUpdate = async (body: any) => {
  const { data } = await post(LinksUpdate, body);
  return data;
};
