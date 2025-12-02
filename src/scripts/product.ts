import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';
import { Events } from './events.js';
import { Product, ProductPrices } from './models/product.interface.js';
import { State } from './state.js';
import { formatCurrency, formatNumber } from './utils.js';

export class ProductComponent {
  id = 0;
  name = '';
  icon = '';
  unlocked = false;
  inStock = 0;
  warehouseBox = document.createElement('div');
  prices: ProductPrices = { retail: 0, wholesale: 0 };
  amountToBuy = 1;

  constructor(product: Product) {
    Object.assign(this, product);
    // Object.entries(product).forEach(([key, value]) => {
    //   this[key as keyof Product] = value as any;
    // });

    this.initializeWarehouseBox();
  }

  initializeWarehouseBox() {
    this.warehouseBox.classList.add('warehouse__product');
    this.warehouseBox.innerHTML = `<div class="product">
      <div class="product__header">
        <div class="product__icon">
          <img src="${this.icon}" alt="" width="32" height="32" />
        </div>
        <div class="product__name">${this.name}</div>
      </div>
      <table class="product__amounts">
        <thead>
          <tr>
            <th>In Storage</th>
            <th>On Shelves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="in-storage">${formatNumber(this.inStock)}</td>
            <td class="on-shelves">0</td>
          </tr>
        </tbody>
      </table>
      <div class="product__buy">
        <select>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="100">100</option>
        </select>
        <button>${formatCurrency(this.prices.wholesale)}</button>
      </div>
      <div class="product__barcode"></div>
    </div>`;

    if (!State.canAfford(this.prices.wholesale * this.amountToBuy)) {
      this.warehouseBox
        .querySelector('.product__buy')!
        .classList.add('product__buy--disabled');
    }

    this.warehouseBox
      .querySelector('.product__buy button')!
      .addEventListener('click', () => this.buy());

    this.warehouseBox
      .querySelector('.product__buy select')
      ?.addEventListener('change', (event) => this.updateAmountToBuy(event));

    let barcode = createCanvas(0, 0);
    JsBarcode(barcode, this.name + ': ' + this.prices.wholesale, {
      displayValue: false,
      background: '#ffffff33',
      lineColor: '#000000',
    });
    this.warehouseBox
      .querySelector('.product__barcode')!
      .append(barcode as unknown as Node);

    Events.subscribe('itemBought', () => {
      this.warehouseBox.querySelector(
        '.product__amounts .in-storage',
      )!.textContent = formatNumber(this.inStock);
      if (!State.canAfford(this.prices.wholesale * this.amountToBuy)) {
        this.warehouseBox
          .querySelector('.product__buy')!
          .classList.add('product__buy--disabled');
      } else {
        this.warehouseBox
          .querySelector('.product__buy')!
          .classList.remove('product__buy--disabled');
      }
    });
  }

  updateAmountToBuy(event: Event) {
    let newValue = parseInt((event.target as HTMLInputElement).value) ?? 1;

    this.warehouseBox.querySelector('.product__buy button')!.textContent = (
      newValue * this.prices.wholesale
    ).toLocaleString('en-Us', {
      style: 'currency',
      currency: 'USD',
    });

    this.amountToBuy = newValue;

    if (!State.canAfford(this.prices.wholesale * this.amountToBuy)) {
      this.warehouseBox
        .querySelector('.product__buy')!
        .classList.add('product__buy--disabled');
    } else {
      this.warehouseBox
        .querySelector('.product__buy')!
        .classList.remove('product__buy--disabled');
    }
  }

  renderWarehouseBox() {
    return this.warehouseBox;
  }

  buy() {
    if (!State.canAfford(this.prices.wholesale * this.amountToBuy)) {
      return;
    }

    this.inStock += this.amountToBuy;
    State.money -= this.amountToBuy * this.prices.wholesale;
    Events.notify('itemBought');
  }
}
