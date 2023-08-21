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
import { environment } from 'src/environments/environment';

function initializeApp(): () => Promise<void> {
  const frontendAppVersion = localStorage.getItem('version');
  if (environment.appVersion !== frontendAppVersion) {
    localStorage.clear();
  }
  
  return async () => {
    return window.electron
      .invoke('shell', { action: 'get_system_info' })
      .then((systemInfo: SystemInfo) => {
        localStorage.setItem('systemInfo', JSON.stringify(systemInfo));
      });
  };
}

function platformServiceFactory(): PlatformService {
  const os = window.systemInfo().platform;

  if (os === 'DARWIN') {
    return new MacosPlatformService();
  }

  if (os === 'LINUX') {
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
