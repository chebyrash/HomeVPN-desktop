import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { ShopPageComponent } from './modules/shop/shop-page/shop-page.component';
import { SettingsPageComponent } from './modules/settings/components/settings-page/settings-page.component';
import { ReferralsPageComponent } from './modules/referrals/components/referrals-page/referrals-page.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthSuccessComponent } from './components/auth-success/auth-success.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'shop',
        component: ShopPageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      },
      {
        path: 'referrals',
        component: ReferralsPageComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'success-auth',
    component: AuthSuccessComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
