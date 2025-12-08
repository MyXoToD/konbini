import { Product } from '../models/product.interface';

export const productsFactory = (): Product[] => [
  {
    id: 1,
    name: 'Bread',
    prices: {
      wholesale: 1,
      retail: 2,
    },
    icon: '/products/bread.png',
    description: 'A fresh loaf of bread.',
    inStock: 0,
    unlocked: true,
  },
  {
    id: 2,
    name: 'Cheese',
    prices: {
      wholesale: 2,
      retail: 3.5,
    },
    icon: '/products/bread.png',
    description: 'Yummy cheese.',
    inStock: 0,
    unlocked: true,
  },
];
