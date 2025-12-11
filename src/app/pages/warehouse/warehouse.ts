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

  addToCart(product: CartProduct) {
    const cartProduct = this.cartProducts.find((cp) => cp.product.id === product.product.id);
    if (cartProduct) {
      cartProduct.amount += product.amount;
    } else {
      this.cartProducts.push(product);
    }
  }
}
