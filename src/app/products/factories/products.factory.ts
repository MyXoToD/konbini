import { Product } from '../models/product.interface';
import { StorageType } from '../models/storageType.enum';

export const productsFactory = (): Product[] => [
  {
    id: 1,
    name: 'Cereal',
    prices: {
      wholesale: 1,
      retail: 2,
    },
    icon: './products/bread.png',
    description: 'To start the day right.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
  {
    id: 2,
    name: 'Sliced Bread',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: './products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
  {
    id: 3,
    name: 'Flour',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: './products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
  {
    id: 4,
    name: 'Oil',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: './products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
  {
    id: 5,
    name: 'Pasta',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: './products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
  {
    id: 6,
    name: 'Powdered Sugar',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: './products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
  {
    id: 7,
    name: 'Bottled Water',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: './products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    storageType: StorageType.SHELF,
    unlocked: true,
  },
];
