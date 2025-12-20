import { Component, effect, inject, Input, input, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { GameState } from '../../shared/GameState';
import { formatCurrency } from '../../shared/utils';
import { CartProduct } from './models/cartProduct.interface';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'konbini-cart',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit, OnDestroy {
  state = inject(GameState);
  faShoppingCart = faCartShopping;
  showCart = false;
  // products = input.required<CartProduct[]>();

  @Input() products$!: Observable<CartProduct>;
  private destroy$ = new Subject<void>();

  // cart: any;
  cart: CartProduct[] = [];
  trashIcon = faTrashCan;
  get productCount() {
    return this.cart.reduce((total, item) => total + item.amount, 0);
  }

  constructor() {
    // effect(() => {
    //   this.cart = this.products();
    // });
    // effect(() => {
    //   console.log(this.products());
    //   this.cart = computed(() =>
    //     this.products()?.map((product) => ({ productId: product.id, amount: 0 })),
    //   );
    // });
  }

  ngOnInit() {
    this.products$.subscribe((product) => {
      if (!product) return;

      let existing = this.cart.find((p) => p.product.id === product.product.id);
      if (existing) {
        existing.amount += product.amount;
      } else {
        this.cart.push(product);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  removeProduct(product: CartProduct) {
    this.cart = this.cart.filter((item) => item.product.id !== product.product.id);
  }

  formatPrice(price: number) {
    return formatCurrency(price);
  }

  getTotalPrice() {
    return formatCurrency(
      this.cart.reduce((total, item) => total + item.product.prices.wholesale * item.amount, 0),
    );
  }

  canBuy() {
    return (
      this.state.money() >=
      this.cart.reduce((total, item) => total + item.product.prices.wholesale * item.amount, 0)
    );
  }

  placeOrder() {
    if (!this.canBuy()) return;

    const totalPrice = this.cart.reduce(
      (total, item) => total + item.product.prices.wholesale * item.amount,
      0,
    );

    this.cart.forEach((item) => {
      this.state.addProductToInventory(item.product, item.amount);
    });

    this.state.spendMoney(totalPrice);
    this.cart = [];
  }
}
