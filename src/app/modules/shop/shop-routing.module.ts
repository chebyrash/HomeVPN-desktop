import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop-page/shop-page.component';

const routes: Routes = [{ path: '', component: ShopPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
