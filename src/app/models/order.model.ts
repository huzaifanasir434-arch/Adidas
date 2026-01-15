import { Product } from './product.model';

export interface OrderItem {
  product: Product;
  quantity: number;
  color: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: Date;
}
