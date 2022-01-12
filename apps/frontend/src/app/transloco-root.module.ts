import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import {
  getBrowserCultureLang,
  getBrowserLang,
  Translation,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
} from '@ngneat/transloco';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'de'],
        defaultLang: 'en',
        missingHandler: {
          useFallbackTranslation: true,
        },
        fallbackLang: 'en',
        reRenderOnLangChange: false,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {
  constructor(private readonly translocoService: TranslocoService) {
    const cultureLang = getBrowserCultureLang();

    if (this.translocoService.isLang(getBrowserCultureLang())) {
      this.translocoService.setActiveLang(cultureLang);
    } else {
      const defaultLang = this.translocoService.getDefaultLang();
      const lang = getBrowserLang() || defaultLang;

      if (this.translocoService.isLang(lang)) {
        this.translocoService.setActiveLang(lang);
      } else {
        this.translocoService.setActiveLang(defaultLang);
      }
    }
  }
}
