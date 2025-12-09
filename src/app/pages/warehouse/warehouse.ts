import { Component, inject } from '@angular/core';
import { Cart } from '../../features/cart/cart';
import { CartProduct } from '../../features/cart/models/cartProduct.interface';
import { Product } from '../../products/models/product.interface';
import { ProductComponent } from '../../products/product/product';
import { GameState } from '../../shared/GameState';

@Component({
  selector: 'konbini-warehouse',
  imports: [ProductComponent, Cart],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class Warehouse {
  readonly state = inject(GameState);

  products: Product[] = this.state.products();
  cartProducts: CartProduct[] = [];

  addToCart(product: Product) {
    const cartProduct = this.cartProducts.find((cp) => cp.product.id === product.id);
    if (cartProduct) {
      cartProduct.amount += 1;
    } else {
      this.cartProducts.push({ product, amount: 1 });
    }
    // this.cartProducts.update((products) => [...products, product]);
  }
}
