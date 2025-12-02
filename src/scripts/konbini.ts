import { State } from './state.js';

export class Konbini {
  lastTimestamp = null;
  defaultScreen = 'warehouse';

  constructor() {
    State.initialize();
    this.switchScreen();
    this.initializeActions();
    this.initializeWarehouse();
  }

  initializeActions() {
    const buttons = document.querySelectorAll('[data-action]');
    buttons.forEach((button) => {
      const action: string = button.getAttribute('data-action')!;
      const payload = button.getAttribute('data-action-payload') || null;

      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.handleAction(action, payload);
      });
    });
  }

  handleAction(action: string, payload: any = null) {
    switch (action) {
      case 'switchScreen':
        this.switchScreen(payload);
        break;
      default:
        throw new Error(`No handler for action '${action}'.`);
    }
  }

  switchScreen(newScreen = this.defaultScreen) {
    const screens = document.querySelectorAll('[data-screen]');
    screens.forEach((screen) => {
      screen.classList.remove('screen--active');

      if (screen.getAttribute('data-screen') === newScreen) {
        screen.classList.add('screen--active');
      }
    });
  }

  initializeWarehouse() {
    const warehouse = document.querySelector('.warehouse')!;
    warehouse.innerHTML = '';
    State.products.forEach((product) => {
      warehouse.append(product.renderWarehouseBox());
    });
  }
}
