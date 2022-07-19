import {
  IProduct,
  TCategory,
  TCategoryArgs,
  TCategoryContext,
  TCategoryParent,
  TProductArgs,
  TProductContext,
  TProductParent,
} from '../utils/typings';

export const Query = {
  hello: () => {
    return 'World!';
  },
  products: (
    parent: TProductParent,
    args: TProductArgs,
    { db }: TProductContext
  ) => {
    const onSale = args?.filter ? args.filter.onSale : undefined;
    const avgRating = args?.filter ? args.filter.avgRating : undefined;

    let filteredProducts: any = db.products;

    if (onSale === true) {
      filteredProducts = filteredProducts.filter((product: IProduct) => {
        return product.onSale;
      });
    }

    if ([1, 2, 3, 4, 5].includes(avgRating!)) {
      filteredProducts = filteredProducts.filter((product: IProduct) => {
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
      });
    }

    return filteredProducts;
  },

  product: (
    parent: TProductParent,
    { id: productId }: TProductArgs,
    { db }: TProductContext
  ) => {
    return db.products.find((product) => product.id === productId);
  },

  categories: (
    parent: TProductParent,
    args: TProductArgs,
    { db }: TProductContext
  ) => {
    return db.categories;
  },
  category: (
    parent: TCategoryParent,
    { id }: TCategoryArgs,
    { db }: TProductContext
  ) => {
    return db.categories.find((category: TCategory) => category.id === id);
  },
};
