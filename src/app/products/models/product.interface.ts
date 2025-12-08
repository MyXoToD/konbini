import { ProductPrices } from './productPrices.interface';
import { StorageType } from './storageType.enum';

export interface Product {
  id: number;
  name: string;
  prices: ProductPrices;
  description: string;
  icon: string;
  inStock: number;
  storageType: StorageType;
  unlocked: boolean;
}
