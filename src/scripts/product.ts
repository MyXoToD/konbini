import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';
import { Events } from './events';
import { Product, ProductPrices } from './models/product.interface';
import { State } from './state';

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
      <div class="product__stock">${this.inStock}x</div>
      <div class="product__buy">
        <select>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <button>Buy</button>
        <div class="product__price">for ${this.prices.wholesale.toLocaleString('en-Us')}$</div>
      </div>
      <div class="product__barcode"></div>
    </div>`;

    this.warehouseBox
      .querySelector('.product__buy button')!
      .addEventListener('click', () => this.buy());

    this.warehouseBox
      .querySelector('.product__buy select')
      ?.addEventListener('change', (event) => {
        let newValue = parseInt((event.target as HTMLInputElement).value) ?? 1;

        this.amountToBuy = newValue;
      });

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
      this.warehouseBox.querySelector('.product__stock')!.textContent =
        `${this.inStock}x`;
    });
  }

  renderWarehouseBox() {
    return this.warehouseBox;
  }

  buy() {
    this.inStock += this.amountToBuy;
    State.money -= this.amountToBuy * this.prices.wholesale;
    Events.notify('itemBought');
  }
}
