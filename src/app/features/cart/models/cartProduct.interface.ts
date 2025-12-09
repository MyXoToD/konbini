import { Product } from '../../../products/models/product.interface';

export interface CartProduct {
  product: Product;
  amount: number;
}
