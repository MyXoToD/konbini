import { StorageType } from './storageType.enum';

export interface ProductPrices {
  retail: number;
  wholesale: number;
}

export interface Product {
  id: number;
  name: string;
  icon: string;
  prices: ProductPrices;
  storageType: StorageType;
  unlocked: boolean;
}
