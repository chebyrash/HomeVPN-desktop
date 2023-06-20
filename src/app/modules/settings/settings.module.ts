import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { LanguageComponent } from './components/language/language.component';
import { UserIdComponent } from './components/user-id/user-id.component';
import { VersionComponent } from './components/version/version.component';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [
    SettingsPageComponent,
    LanguageComponent,
    UserIdComponent,
    VersionComponent,
  ],
  imports: [CommonModule, HeaderComponent, SettingsRoutingModule, NgLetModule],
  exports: [],
  providers: [],
})
export class SettingsModule {}
