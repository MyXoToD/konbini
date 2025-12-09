import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { formatCurrency } from '../../shared/utils';
import { Product } from '../models/product.interface';

@Component({
  selector: 'konbini-product',
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
  imports: [TranslatePipe],
})
export class ProductComponent {
  product = input.required<Product>();
  addedToCart = output<Product>();

  getProductTranslationKey(): string {
    return this.product().name.replace(/\s+/g, '-').toLowerCase();
  }

  getWholesalePrice() {
    return formatCurrency(this.product().prices.wholesale);
  }

  addToCart() {
    this.addedToCart.emit(this.product());
  }
}
