import { Directive, HostListener, inject } from '@angular/core';
import { GameState } from '../GameState';

@Directive({
  selector: '[vibrate]',
})
export class Vibrate {
  state = inject(GameState);

  @HostListener('click')
  onClick() {
    if (navigator.vibrate && this.state.settings().vibration) {
      navigator.vibrate(50);
    }
  }
}
