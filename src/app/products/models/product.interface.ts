import { ProductPrices } from './productPrices.interface';

export interface Product {
  id: number;
  name: string;
  prices: ProductPrices;
  description: string;
  inStock: number;
  unlocked: boolean;
}
