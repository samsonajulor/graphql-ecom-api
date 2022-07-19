import {
  IProduct,
  TCategory,
  TCategoryContext,
  TProductArgs,
  TProductContext,
  TReview,
  TReviewContext,
} from '../utils/typings';

export const Product = {
  category: (
    { categoryId }: IProduct,
    args: TProductArgs,
    { db }: TProductContext
  ) => {
    return db.categories.find(
      (category: TCategory) => category.id === categoryId
    );
  },
  reviews: ({ id }: TReview, args: TProductArgs, { db }: TProductContext) => {
    return db.reviews.filter((review) => review.productId === id);
  },
};
