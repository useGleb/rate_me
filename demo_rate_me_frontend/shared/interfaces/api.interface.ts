import { FileUploadObject, IPageData } from "./page.interface";
import { ICategoryRating } from "./rating.interface";

export type CreatePageRequestData = {
  name: string;
  description: string;
  image: FileUploadObject;
  categories: string[];
};

export type RatePageRequestData = {
  id: number;
  message: string;
  category_ratings: ICategoryRating[];
};

export type PageRecommendationsResponseData = {
  mostRecent: IPageData[];
  mostRated: IPageData[];
};
