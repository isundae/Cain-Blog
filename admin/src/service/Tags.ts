import { Tags, TagsDelete, TagsUpdate } from "./api";
import { get, post } from "../utils/axios-request";
export const TagsFandAll = async (params: any) => {
  return await get(Tags, params);
};

export const TagsCreate = async (body: any) => {
  return await post(Tags, body);
};

export const TagDelete = async (id: string) => {
  return await post(`${TagsDelete}/${id}`);
};

export const TagUpdate = async (body: any) => {
  return await post(TagsUpdate, body);
};
