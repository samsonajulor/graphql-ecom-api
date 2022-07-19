import {
  IProduct,
  TCategoryParent,
  TFilter,
  TProductArgs,
  TProductContext,
} from '../utils/typings';

export const Category = {
  products: (
    { id: categoryId }: TCategoryParent,
    args: TProductArgs,
    { db }: TProductContext
  ) => {
    const onSale = args?.filter ? args.filter.onSale : undefined;
    const avgRating = args?.filter ? args.filter.avgRating : undefined;

    const categoryProducts = db.products.filter(
      (product: IProduct) => product.categoryId === categoryId
    );
    let filteredCategoryProducts = categoryProducts;

    if (onSale === true) {
      filteredCategoryProducts = filteredCategoryProducts.filter(
        (product: IProduct) => {
          return product.onSale;
        }
      );
    }

    if ([1, 2, 3, 4, 5].includes(avgRating!)) {
      filteredCategoryProducts = filteredCategoryProducts.filter(
        (product: IProduct) => {
          let sumRating = 0;
          let numberOfReviews = 0;

          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });

          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating!;
        }
      );
    }

    return filteredCategoryProducts;
  },
};
