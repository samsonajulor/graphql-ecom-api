import { v4 as uuid } from 'uuid';
import {
  IProduct,
  TCategory,
  TCategoryArgs,
  TCategoryContext,
  TCategoryParent,
  TProductArgs,
  TProductContext,
  TProductParent,
  TReview,
} from '../utils/typings';

export const Mutation = {
  addCategory: (
    parent: TCategoryParent,
    args: { input: TCategory },
    { db }: TProductContext
  ) => {
    const { name } = args.input;

    const newCategory: TCategory = {
      id: uuid(),
      name,
    };

    db.categories.push(newCategory);

    return newCategory;
  },

  addProduct: (
    parent: TProductParent,
    args: { input: IProduct },
    { db }: TProductContext
  ) => {
    const { name, description, quantity, onSale, price, image, categoryId } =
      args.input;

    const category = db.categories.filter((cat) => cat.id === categoryId);
    if (category.length <= 0) return;

    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      onSale,
      price,
      image,
      categoryId,
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addReview: (
    parent: TProductParent,
    args: { input: TReview },
    { db }: TProductContext
  ) => {
    const { date, title, comment, rating, productId } = args.input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);

    return newReview;
  },

  deleteCategory: (
    parent: TProductParent,
    args: TCategoryArgs,
    { db }: TProductContext
  ) => {
    let id = args.id;

    const category = db.categories.find((category) => category.id === id);

    if (!category) return false;

    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id)
        return {
          ...product,
          categoryId: null,
        };
      else return product;
    }) as IProduct[];
    return true;
  },

  deleteProduct: (
    parent: TProductParent,
    args: TProductArgs,
    { db }: TProductContext
  ) => {
    const id = args.id;

    const product = db.products.find((product) => product.id === id);

    if (!product) return;

    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },
};
