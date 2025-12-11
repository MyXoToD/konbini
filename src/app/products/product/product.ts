import { Component, input, output, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { formatCurrency } from '../../shared/utils';
import { Product } from '../models/product.interface';
import { CartProduct } from '../../features/cart/models/cartProduct.interface';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'konbini-product',
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
  imports: [TranslatePipe, FontAwesomeModule],
})
export class ProductComponent {
  product = input.required<Product>();
  addedToCart = output<CartProduct>();
  amountToAdd = 1;
  icons = {
    minus: faMinus,
    plus: faPlus,
  };

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
