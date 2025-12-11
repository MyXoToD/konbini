import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GameState } from '../../shared/GameState';

@Component({
  selector: 'konbini-settings',
  imports: [TranslatePipe],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private readonly _translateService = inject(TranslateService);
  state = inject(GameState);

  languages = ['en', 'de', 'jp'];
  currentLanguage = this._translateService.getCurrentLang();

  changeLanguage(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this._translateService.use(value);
  }

  changeCurrency(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    // this.state.updateSettings({ currency: value });
  }

  toggleVibration(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.state.updateSettings({ vibration: checked });
  }

  toggleMusic(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.state.updateSettings({ music: checked });
  }
}
