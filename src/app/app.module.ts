import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MacosPlatformService } from './services/platform/macos-platform.service';
import { LinuxPlatformService } from './services/platform/linux-platform.service';
import { WindowsPlatformService } from './services/platform/windows-platform.service';
import { PlatformService } from './services/platform/platform-service';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SystemInfo } from './models/interfaces/system-info.interface';

function initializeApp(): () => Promise<void> {
  return async () => {
    console.log(window.electron);
    return window.electron
      .invoke('shell', { action: 'get_system_info' })
      .then((systemInfo: SystemInfo) => {
        console.log('>>>>>>>>>', systemInfo);
        localStorage.setItem('systemInfo', JSON.stringify(systemInfo));
      });
  };
}

function platformServiceFactory(): PlatformService {
  const os = window.systemInfo().os;

  if (os === 'macos') {
    return new MacosPlatformService();
  }

  if (os === 'linux') {
    return new LinuxPlatformService();
  }

  return new WindowsPlatformService();
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
    },
    {
      provide: PlatformService,
      useFactory: platformServiceFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
