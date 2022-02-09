import { Blog, BlogDelete, BlogUpdate } from "./api";
import { get, post } from "../utils/axios-request";

interface Blogx {
  title: string;
  cover: string;
  introduce: string;
  content: string;
  htmlconten: string;
  tag: string;
}

export const BlogFindAll = async (params: any) => {
  const { data } = await get(Blog, params);
  return data;
};

export const BlogCreate = async (body: Blogx) => {
  const { data } = await post(Blog, body);
  return data;
};

export const BlogsDelete = async (id: string) => {
  const { data } = await post(`${BlogDelete}/${id}`);
  return data;
};

export const BlogsUpdate = async (body: any) => {
  const { data } = await post(BlogUpdate, body);
  return data;
};
