export type Product = {
  ean: string;
  name: string;
  genericName?: string;
  imageSmallUrl: string;
  brand?: string;
  ingredients?: string;
  nutriscoreGrade?: string;
  imageUrl?: string;
  quantity?: string;
  categories?: Category[];
  articles?: Article[];
};

export type UserProductPreferences = {
  product: Product;
  categories: number[];
  contentUnit: ContentUnit;
};

export type Category = {
  id: number;
  name: string;
  color?: string;
};

export type Article = {
  id: number;
  expirationDate?: number;
  quantity: number;
  started?: boolean;
  location: Location;
};

export type Location = {
  id: string;
  name: string;
};

export type ContentUnit = {
  id: number;
  name: string;
};
