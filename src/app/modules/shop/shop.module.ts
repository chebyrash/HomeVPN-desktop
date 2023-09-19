import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShopRoutingModule } from "./shop-routing.module";
import { ShopPageComponent } from "./shop-page/shop-page.component";
import { BalanceComponent } from "./balance/balance.component";
import { DialogModule } from "../dialog";
import { HeaderComponent } from "../../components/header/header.component";
import { NgLetModule } from "ng-let";
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@NgModule({
  declarations: [ShopPageComponent, BalanceComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    DialogModule,
    HeaderComponent,
    NgLetModule,
    SpinnerComponent
  ],
  exports: [],
  providers: [],
})
export class ShopModule {}
