import { Component, computed, effect, input, Signal, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../products/models/product.interface';
import { CartProduct } from './models/cartProduct.interface';

@Component({
  selector: 'konbini-cart',
  imports: [FontAwesomeModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  faShoppingCart = faCartShopping;
  showCart = false;
  products = input<Signal<Product[]>>();
  // cart: any;
  cart = computed(() => this.products());

  constructor() {
    // effect(() => {
    //   console.log(this.products());
    //   this.cart = computed(() =>
    //     this.products()?.map((product) => ({ productId: product.id, amount: 0 })),
    //   );
    // });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
