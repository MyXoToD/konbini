import { Component, inject } from '@angular/core';
import { GameState } from '../../shared/GameState';
import { Product } from '../../products/models/product.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'konbini-warehouse',
  imports: [TranslatePipe],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class Warehouse {
  readonly state = inject(GameState);

  products: Product[] = this.state.products();
}
