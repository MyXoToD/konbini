import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GameState } from '../../GameState';
import { Navigation } from '../../navigation/navigation';

@Component({
  selector: 'konbini-sidebar',
  imports: [TranslatePipe, Navigation],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly state = inject(GameState);

  addMoney() {
    this.state.addMoney(100);
  }
}
