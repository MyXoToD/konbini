import { Component, inject } from '@angular/core';
import { ShelfComponent } from '../../features/shelf/shelf';
import { GameState } from '../../shared/GameState';

@Component({
  selector: 'konbini-shop',
  imports: [ShelfComponent],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop {
  private state = inject(GameState);

  shelves = this.state.shelves();
}
