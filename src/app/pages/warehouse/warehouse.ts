import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Product } from '../../products/models/product.interface';
import { ProductComponent } from '../../products/product/product';
import { GameState } from '../../shared/GameState';
import { Cart } from '../../features/cart/cart';

@Component({
  selector: 'konbini-warehouse',
  imports: [ProductComponent, Cart],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class Warehouse {
  readonly state = inject(GameState);

  products: Product[] = this.state.products();
  $cartProducts = signal<Product[]>([]);

  addToCart(product: Product) {
    this.$cartProducts.update((products) => [...products, product]);
  }
}
