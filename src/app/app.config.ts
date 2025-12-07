import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideMissingTranslationHandler, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { CustomMissingTranslationHandler } from './shared/i18n/CustomMissingTranslationHandler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './locales/',
        suffix: '.json'
      }),
      missingTranslationHandler: provideMissingTranslationHandler(CustomMissingTranslationHandler),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
};
