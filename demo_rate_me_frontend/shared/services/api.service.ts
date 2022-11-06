import axios from "axios";
import {
  CreatePageRequestData,
  PageRecommendationsResponseData,
  RatePageRequestData,
} from "../interfaces/api.interface";
import { IPageData } from "../interfaces/page.interface";
import { IComment } from "../interfaces/rating.interface";

const axiosInstance = axios.create({ baseURL: process.env.BACKEND_URL });

export const createPage = async (
  data: CreatePageRequestData
): Promise<IPageData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  data.categories.forEach((category) => {
    formData.append("categories", JSON.stringify(category));
  });
  formData.append("image", data.image.file);

  const res = await axiosInstance.post("/page", formData);
  return res.data;
};

export const getPage = async (id: number): Promise<IPageData> => {
  if (id === NaN) {
    return null;
  }
  const res = await axiosInstance.get("/page/" + id);
  return res.data;
};

export const ratePage = async (data: RatePageRequestData) => {
  const res = await axiosInstance.post(`/feedback/${data.id}`, data);
  return res.data;
};

export const getComments = async (id: number): Promise<IComment> => {
  const res = await axiosInstance.get(`/feedback/${id}`);
  return res.data;
};

export const getRecommendations =
  async (): Promise<PageRecommendationsResponseData> => {
    const res = await axiosInstance.get("/page");
    return res.data;
  };
