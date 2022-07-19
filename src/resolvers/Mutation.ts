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
};
