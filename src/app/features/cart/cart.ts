import { Component, effect, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
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
  products = input.required<CartProduct[]>();
  // cart: any;
  cart: CartProduct[] = [];

  constructor() {
    effect(() => {
      this.cart = this.products();
    });
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
