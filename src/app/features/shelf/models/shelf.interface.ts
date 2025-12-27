import { Product } from '../../../products/models/product.interface';
import { StorageType } from '../../../products/models/storageType.enum';

export interface Shelf {
  type: StorageType;
  slots: number;
  products: Product[];
}
