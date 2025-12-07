import { Product } from '../models/product.interface';

export const productsFactory = (): Product[] => [
  {
    id: 1,
    name: 'Bread',
    prices: {
      wholesale: 1,
      retail: 2,
    },
    description: 'A fresh loaf of bread.',
    inStock: 0,
    unlocked: true,
  },
];
