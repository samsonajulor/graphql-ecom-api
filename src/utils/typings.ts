export type TProductContext = {
  db: {
    products: IProduct[];
    reviews: TReview[];
    categories: TCategory[];
  };
};

export type TProductParent = {
  id: string;
};

export type TProductArgs = {
  id?: string;
  filter?: {
    onSale: boolean;
    avgRating: number;
  };
  input?: IProduct;
};

export type TCategoryContext = {
  categories: [TCategory];
};
export type TCategoryParent = {
  id: string;
};
export type TCategoryArgs = {
  id: string;
  input: TCategory;
};

export type TReviewContext = {
  reviews: [TReview];
};

export type TReview = {
  id: string;
  date: string;
  title: string;
  comment: string;
  rating: number;
  productId: string;
};

export type IProduct = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  onSale: false;
  categoryId: string;
};

export type TCategory = {
  id?: string;
  name?: string;
};

export type TFilter = {
  onSale: boolean;
  avgRating: number;
};
