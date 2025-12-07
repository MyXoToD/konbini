import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Sidebar } from './shared/layout/sidebar/sidebar';

@Component({
  selector: 'konbini-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private translate = inject(TranslateService);
  languages = ['en', 'de', 'jp'];

  constructor() {
    this.translate.addLangs(['en', 'de', 'jp']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
