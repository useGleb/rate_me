import { CategoryEntity } from 'src/category/category.entity';

export type CategoryRating = {
  category: CategoryEntity;
  rating: number;
};

export type RateRequestBody = {
  message: string;
  category_ratings: CategoryRating[];
};
