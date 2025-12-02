import breadIcon from 'url:../../static/bread.png';
import cheeseIcon from 'url:../../static/cheese.png';
import milkIcon from 'url:../../static/milk.png';
import { Product } from '../models/product.interface.js';
import { StorageType } from '../models/storageType.enum.js';

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
  {
    id: 3,
    name: 'Cheese',
    icon: cheeseIcon,
    prices: {
      retail: 2.99,
      wholesale: 1.5,
    },
    storageType: StorageType.Fridge,
    unlocked: true,
  },
];
