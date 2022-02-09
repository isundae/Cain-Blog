import { post } from "@/utils/axios-request";
import { upload } from "./api";
export const Upload = async (from: FormData) => {
  return await post(upload, from);
};
