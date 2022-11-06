import { IRatingCategory } from "./page.interface";

export type ICategoryRating = {
  category: IRatingCategory;
  rating: number;
};

export type IComment = {
  message: string;
  createdAt: Date;
  ratings: ICategoryRating[];
};
