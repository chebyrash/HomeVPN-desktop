import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { AuthModule } from "./modules/auth/auth.module";
import { HomeModule } from "./modules/home/home.module";
import { ReferralsModule } from "./modules/referrals/referrals.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { ShopModule } from "./modules/shop/shop.module";
import { AuthSuccessComponent } from "./components/auth-success/auth-success.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    ReferralsModule,
    SettingsModule,
    ShopModule,
    AuthSuccessComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
