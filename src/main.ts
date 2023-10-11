import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Observable, from, take } from 'rxjs';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

polyfillCountryFlagEmojis()

declare global {
  interface Window {
    electron: {
      invoke: <T = any>(channel: string, message: {
        action: string,
        payload?: any
      }) => Promise<T>,
      invoke$: <T = any>(channel: string, message: {
        action: string, payload?: any
      }) => Observable<T>
    };
    gapi: any;
    AppleID: any;
  }
}
if ((window as any).electron) {
  (window as any).electron.invoke$ = (channel: string, message: {
    action: string,
    payload?: any
  }) => {
    return from(window.electron.invoke(channel, message)).pipe(take(1))
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
