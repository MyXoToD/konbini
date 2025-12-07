import { Injectable } from '@angular/core';
import { productsFactory } from './factories/products.factory';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _products = productsFactory();

  getAllProducts() {
    return this._products;
  }
}
