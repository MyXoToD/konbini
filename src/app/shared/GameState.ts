import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../products/models/product.interface';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private readonly _productsService = inject(ProductsService);

  private _money = signal<number>(1000);
  readonly money = this._money.asReadonly();
  private _products = signal<Product[]>(this._productsService.getAllProducts());
  readonly products = this._products.asReadonly();

  constructor() {
    this.loadState();
  }

  loadState() {
    const savedState = localStorage.getItem('gameState');

    if (savedState) {
      const state = JSON.parse(savedState);

      // Restore numeric money value if present. Avoid Object.assign because
      // it would overwrite the signal itself and break reactivity.
      if (state && typeof state._money === 'number') {
        this._money.set(state._money);
      } else if (state && typeof state.money === 'number') {
        this._money.set(state.money);
      }
    }
  }

  addMoney(amount: number) {
    this._money.update((current) => current + amount);
  }
}
