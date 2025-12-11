import { computed, inject, Injectable, signal } from '@angular/core';
import { GameSettings } from '../pages/settings/models/settings.interface';
import { Product } from '../products/models/product.interface';
import { ProductsService } from '../products/products.service';
import { formatCurrency } from './utils';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private readonly _productsService = inject(ProductsService);

  private _money = signal<number>(1000);
  readonly money = this._money.asReadonly();
  readonly moneyFormatted = computed(() => {
    return formatCurrency(this._money());
  });
  private _products = signal<Product[]>(this._productsService.getAllProducts());
  readonly products = this._products.asReadonly();
  private _daytime = signal<Date>(new Date());
  readonly daytime = computed(() => this.formatDaytime());
  private _day = signal<number>(1);
  readonly day = this._day.asReadonly();

  private _settings = signal<GameSettings>({
    music: true,
    soundEffects: true,
    musicVolume: 1,
    soundEffectsVolume: 1,
    vibration: true,
  });
  settings = this._settings.asReadonly();

  private _previousTimestamp: number | null = null;
  private _config = {
    dayLength: 24 * 60 * 60 * 1000,
    dayDuration: 20 * 60 * 1000,
  };

  constructor() {
    this.loadState();
    this._daytime().setHours(0, 0, 0, 0);
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  loadState() {
    const savedState = localStorage.getItem('gameState');

    if (savedState) {
      const state = JSON.parse(savedState);

      // Restore numeric money value if present. Avoid Object.assign because
      // it would overwrite the signal itself and break reactivity.
      // if (state && typeof state._money === 'number') {
      //   this._money.set(state._money);
      // } else if (state && typeof state.money === 'number') {
      //   this._money.set(state.money);
      // }
    }
  }

  loop(timestamp: number) {
    if (!this._previousTimestamp) {
      this._previousTimestamp = timestamp;
    }

    const delta = timestamp - this._previousTimestamp;
    const timescale = this._config.dayLength / this._config.dayDuration;

    if (this._daytime().getHours() == 23 && this._daytime().getMinutes() == 59) {
      this._daytime.set(new Date());
      this._daytime().setHours(0, 0, 0, 0);
      this._day.update((value) => value + 1);
    }
    this._daytime.set(new Date(this._daytime().getTime() + delta * timescale));

    this._previousTimestamp = timestamp;
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  formatDaytime() {
    const period = this._daytime().getHours() < 12 ? 'am' : 'pm';
    const hours = (this._daytime().getHours() % 12 || 12).toString().padStart(2, '0');
    const minutes = this._daytime().getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}${period}`;
  }

  addMoney(amount: number) {
    this._money.update((current) => current + amount);
  }

  spendMoney(amount: number) {
    this._money.update((current) => current - amount);
  }

  updateSettings(newSettings: Partial<GameSettings>) {
    this._settings.update((current) => ({ ...current, ...newSettings }));
  }

  addProductToInventory(product: Product, amount: number) {
    this._products.update((current) => {
      const existingProduct = current.find((p) => p.id === product.id);
      if (existingProduct) {
        return current.map((p) =>
          p.id === product.id ? { ...p, inStock: p.inStock + amount } : p,
        );
      }
      return [...current, { ...product, inStock: amount }];
    });
  }
}
