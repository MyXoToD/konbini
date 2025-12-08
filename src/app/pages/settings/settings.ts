import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'konbini-settings',
  imports: [TranslatePipe],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private readonly _translateService = inject(TranslateService);

  languages = ['en', 'de', 'jp'];
  currentLanguage = this._translateService.getCurrentLang();

  changeLanguage(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this._translateService.use(value);
  }
}
