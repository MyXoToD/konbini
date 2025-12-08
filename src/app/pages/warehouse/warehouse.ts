import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../products/models/product.interface';
import { ProductComponent } from '../../products/product/product';
import { GameState } from '../../shared/GameState';

@Component({
  selector: 'konbini-warehouse',
  imports: [TranslatePipe, ProductComponent],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class Warehouse {
  readonly state = inject(GameState);

  products: Product[] = this.state.products();
}
