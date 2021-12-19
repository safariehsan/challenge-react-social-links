import { HttpRequest } from "./api/axios";
import { FormItem } from "./types";

export const getSocialList = () => {
  return HttpRequest.get("");
};

export const addSocialItem = (data: FormItem) => {
  return HttpRequest.post("", data);
};

export const removeSocialItem = (id: number | undefined) => {
  return HttpRequest.delete(`/${id}`);
};

export const updateSocialItem = (id: number | undefined, data: FormItem) => {
  return HttpRequest.patch(`/${id}`, data);
};
