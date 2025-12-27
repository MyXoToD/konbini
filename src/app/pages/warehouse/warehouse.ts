import { Component, effect, inject } from '@angular/core';
import { Subject } from 'rxjs';
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

  private cartInputSubject = new Subject<CartProduct>();

  cartInput$ = this.cartInputSubject.asObservable();
  products: Product[] = this.state.products();
  cartProducts: CartProduct[] = [];

  constructor() {
    effect(() => {
      this.products = this.state.products();
    });
  }

  addToCart(product: CartProduct) {
    this.cartInputSubject.next(product);
  }
}
