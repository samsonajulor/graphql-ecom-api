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
};
