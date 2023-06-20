import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';

const routes: Routes = [{ path: '', component: SettingsPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
