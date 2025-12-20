import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { CartProduct } from '../../features/cart/models/cartProduct.interface';
import { Vibrate } from '../../shared/directives/vibrate';
import { formatCurrency } from '../../shared/utils';
import { Product } from '../models/product.interface';

@Component({
  selector: 'konbini-product',
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
  imports: [TranslatePipe, FontAwesomeModule, Vibrate],
})
export class ProductComponent {
  product = input.required<Product>();
  addedToCart = output<CartProduct>();
  amountToAdd = 1;
  icons = {
    minus: faMinus,
    plus: faPlus,
  };
  get totalPrice() {
    return formatCurrency(this.product().prices.wholesale * this.amountToAdd);
  }

  getProductTranslationKey(): string {
    return this.product().name.replace(/\s+/g, '-').toLowerCase();
  }

  getWholesalePrice() {
    return formatCurrency(this.product().prices.wholesale);
  }

  changeAmountToAdd(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.amountToAdd = parseInt(value);
  }

  addToCart() {
    this.addedToCart.emit({
      product: this.product(),
      amount: this.amountToAdd,
    });
  }

  amountMinus() {
    if (this.amountToAdd == 1) return;
    this.amountToAdd--;
  }

  amountPlus() {
    this.amountToAdd++;
  }
}
