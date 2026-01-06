export interface Product {
  id: number;
  name: string;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  price: number;
  currency: string;
  badge?: string;
  colors: number;
  image: string;
  sizes: number[];
  inStock: boolean;
}
