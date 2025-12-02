import { PRODUCTS } from './data/products.js';
import { Product } from './models/product.interface.js';
import { ProductComponent } from './product.js';

export class State {
  static money = 0;
  static products: ProductComponent[] = [];
  static day = 1;
  static daytime = new Date();
  static status = 'Closed';
  static settings = {
    startingMoney: 1000,
    dayDuration: 20 * 60 * 1000,
    dayLength: 24 * 60 * 60 * 1000,
  };
  static previousTimestamp: number | null = null;

  static initialize() {
    this.daytime.setHours(0, 0, 0, 0);
    this.setMoney(this.settings.startingMoney);
    this.products = PRODUCTS.map(
      (product: Product) => new ProductComponent(product),
    );
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  static loop(timestamp: number) {
    if (!this.previousTimestamp) this.previousTimestamp = timestamp;
    const delta = timestamp - this.previousTimestamp;
    const timeScale = this.settings.dayLength / this.settings.dayDuration;

    document.querySelector('.money')!.textContent =
      `${this.getMoney().toLocaleString('en-Us')}$`;

    if (this.daytime.getHours() == 23 && this.daytime.getMinutes() == 59) {
      // Next day
      this.daytime = new Date();
      this.daytime.setHours(0, 0, 0, 0);
      this.day++;
    }
    this.daytime = new Date(this.daytime.getTime() + delta * timeScale);
    this.updateDayTime();

    this.previousTimestamp = timestamp;
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  static updateDayTime() {
    let timeWrapper = document.querySelector('.time')!;
    const period = this.daytime.getHours() < 12 ? 'am' : 'pm';
    const hours = (this.daytime.getHours() % 12 || 12)
      .toString()
      .padStart(2, '0');
    const minutes = this.daytime.getMinutes().toString().padStart(2, '0');

    timeWrapper.textContent = `Day ${this.day} - ${hours}:${minutes}${period}`;
  }

  static canAfford(amount: number) {
    return this.money >= amount;
  }

  static setMoney(newAmount: number) {
    this.money = newAmount;
  }

  static addMoney(amount: number) {
    this.money += amount;
  }

  static getMoney() {
    return this.money;
  }

  static save() {
    console.log(this);
  }
}
