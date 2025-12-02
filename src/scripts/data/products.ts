import breadIcon from 'url:../../static/bread.png';
import milkIcon from 'url:../../static/milk.png';
import { Product } from '../models/product.interface';
import { StorageType } from '../models/storageType.enum';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Bread',
    icon: breadIcon,
    prices: {
      retail: 3.0,
      wholesale: 1.0,
    },
    storageType: StorageType.Shelf,
    unlocked: true,
  },
  {
    id: 2,
    name: 'Milk',
    icon: milkIcon,
    prices: {
      retail: 2.99,
      wholesale: 1.5,
    },
    storageType: StorageType.Shelf,
    unlocked: true,
  },
];
