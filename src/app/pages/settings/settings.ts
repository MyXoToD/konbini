declare var google: any;

import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GameState } from '../../shared/GameState';

@Component({
  selector: 'konbini-settings',
  imports: [TranslatePipe],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  private readonly _translateService = inject(TranslateService);
  state = inject(GameState);

  languages = ['en', 'de', 'jp'];
  currentLanguage = this._translateService.getCurrentLang();

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: '379042147183-j1v2rckl6rpsq2i5m9am17uicrv1f6sa.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(
      document.querySelector('.google-login'),
      { theme: 'outline', size: 'large' }, // customization attributes
    );
  }

  handleLogin(response: any) {
    if (!response.credential) {
      console.error('Google login failed: No credential returned');
      return;
    }

    const decoded = JSON.parse(atob(response.credential.split('.')[1]));

    this.state.setLoggedInUser(decoded);
  }

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
