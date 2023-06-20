import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { BalanceComponent } from '../../components/balance/balance.component';
import { DialogModule } from '../dialog';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [ShopPageComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    DialogModule,
    HeaderComponent,
    BalanceComponent,
    NgLetModule
  ],
  exports: [],
  providers: [],
})
export class ShopModule {}
