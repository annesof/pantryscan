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
  foods?: Food[];
};

export type Category = {
  id: number;
  name: string;
  color?: string;
};

export type Food = {
  id: number;
  expirationDate?: string;
  started?: boolean;
  location: Location;
};

export type Location = {
  id: number;
  name: string;
};
