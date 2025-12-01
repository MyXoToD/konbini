import { createCanvas } from "https://esm.sh/canvas";
import jsbarcode from "https://esm.sh/jsbarcode";

const StorageType = {
  Shelf: 'shelf',
  Fridge: 'fridge',
  Freezer: 'freezer',
};

const PRODUCTS = [{
  id: 1,
  name: 'Bread',
  prices: {
    retail: 3.00,
    wholesale: 1.00
  },
  storageType: StorageType.Shelf,
  unlocked: true
}, {
  id: 2,
  name: 'Milk',
  prices: {
    retail: 2.99,
    wholesale: 1.50,
  },
  storageType: StorageType.Shelf
}];

class Events {
  static events = {};
  
  /**
   * Subsribes to event name and performes callback whenever a notification for this event happens
   * @param {string} event - event name
   * @param {fn} callback - the callback function
   * @return {number} subscriptions - number of total subscriptions
   */
  static subscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    
    return this.events[event].push(callback);
  }
  
  /**
   * Notifies all subscribers for a given event and passes data to the callbacks
   * @param {string} event - Name of the event
   * @param {Object} data - Data that will be passed to the callback function
   * @return any todo
   */
  static notify(event, data = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }
    
    return this.events[event].map(callback => callback(data));
  }
}

class State {
  static money = 0;
  static products = [];
  static day = 1;
  static daytime = new Date();
  static status = 'Closed';
  static settings = {
    startingMoney: 1000,
    dayDuration: 20 * 60 * 1000,
    dayLength: 24 * 60 * 60 * 1000,
  };
  static previousTimestamp = null;
  
  static initialize() {
    this.daytime.setHours(0, 0, 0, 0);
    this.setMoney(this.settings.startingMoney);
    this.products = PRODUCTS.map(product => new Product(product))
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
  
  static loop(timestamp) {
    if (!this.previousTimestamp) this.previousTimestamp = timestamp;
    const delta = timestamp - this.previousTimestamp;
    const timeScale = this.settings.dayLength / this.settings.dayDuration;
    
    document.querySelector('.money').textContent = `${this.getMoney().toLocaleString("en-Us")}$`;

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
    let timeWrapper = document.querySelector('.time');
    const period = this.daytime.getHours() < 12 ? 'am' : 'pm';
    const hours = (this.daytime.getHours() % 12 || 12).toString().padStart(2, '0');
    const minutes = this.daytime.getMinutes().toString().padStart(2, '0');
    
    timeWrapper.textContent = `Day ${this.day} - ${hours}:${minutes}${period}`;
  }
  
  static setMoney(newAmount) {
    this.money = newAmount;
  }
  
  static getMoney() {
    return this.money;
  }
  
  static save() {
    console.log(this);
  }
}

class Product {
  unlocked = false;
  inStock = 0;
  warehouseBox = null;
  
  constructor(product) {
    Object.entries(product).forEach(([key, value]) => {
      this[key] = value;
    });
    
    this.initializeWarehouseBox();
  }
  
  initializeWarehouseBox() {
    this.warehouseBox = document.createElement('div');
    this.warehouseBox.classList.add('warehouse__product');
    this.warehouseBox.innerHTML = `<div class="product">
      <div class="product__name">${this.name}</div>
      <div class="product__stock">${this.inStock}x</div>
      <div class="product__buy">
        <select>
          <option value="1">1</option>
        </select>
        <button>Buy</button>
        <div class="product__price">for ${this.prices.wholesale.toLocaleString("en-Us")}$</div>
      </div>
      <div class="product__barcode"></div>
    </div>`;
    this.warehouseBox.querySelector('.product__buy button').addEventListener('click', () => this.buy());
    // this.warehouseBox.addEventListener('click', () => this.buy());
    let barcode = createCanvas();
    jsbarcode(barcode, this.name + ': ' + this.prices.wholesale, {
      displayValue: false,
      background: '#ffffff33',
      lineColor: '#000000'
    });
    this.warehouseBox.querySelector('.product__barcode').append(barcode);
    
    Events.subscribe('itemBought', () => {
      this.warehouseBox.querySelector('.product__name').textContent = this.name + ' ('+this.inStock+'x)';
    });
  }
  
  renderWarehouseBox() {
    return this.warehouseBox;
  }
  
  buy() {
    this.inStock++;
    State.money -= this.prices.wholesale;
    Events.notify('itemBought');
  }
}

class Konbini {
  lastTimestamp = null;
  defaultScreen = 'shop';
  
  constructor() {
    State.initialize();
    this.switchScreen();
    this.initializeActions();
    this.initializeWarehouse();
    // requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
  
  loop(timestamp) {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }
    
    const delta = timestamp - this.lastTimestamp;
    // console.log(delta); // 16.00 (1000 == 1s)
    // this.initializeWarehouse();
    document.querySelector('.money').textContent = State.money + '$';
    
    this.lastTimestamp = timestamp;
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
  
  initializeActions() {
    const buttons = document.querySelectorAll('[data-action]');
    buttons.forEach(button => {
      const action = button.getAttribute('data-action');
      const payload = button.getAttribute('data-action-payload') || null;
      
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.handleAction(action, payload);
      });
    });
  }
  
  handleAction(action, payload = null) {
    switch (action) {
      case "switchScreen":
        this.switchScreen(payload);
        break;
      default:
        throw new Error(`No handler for action '${action}'.`);
    }
  }
  
  switchScreen(newScreen = this.defaultScreen) {
    const screens = document.querySelectorAll('[data-screen]');
    screens.forEach(screen => {
      screen.classList.remove('screen--active');
      
      if (screen.getAttribute('data-screen') === newScreen) {
        screen.classList.add('screen--active');
      }
    });
  }
  
  initializeWarehouse() {
    let warehouse = document.querySelector('.warehouse');
    warehouse.innerHTML = '';
    State.products.forEach(product => {      
      warehouse.append(product.renderWarehouseBox());
    });
  }
}

/* ########### */
console.clear();
// const state = new State();
const app = new Konbini();