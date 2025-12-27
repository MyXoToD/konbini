import { Component, effect, input } from '@angular/core';
import { Shelf } from './models/shelf.interface';

@Component({
  selector: 'konbini-shelf',
  imports: [],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
})
export class ShelfComponent {
  shelf = input.required<Shelf>();
  slots = [];

  constructor() {
    effect(() => {
      this.slots = Array.from({ length: this.shelf().slots });
    });
  }
}
