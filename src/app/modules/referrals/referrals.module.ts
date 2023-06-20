import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralsRoutingModule } from './referrals-routing.module';
import { ReferralsPageComponent } from './components/referrals-page/referrals-page.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { ApplyLinkComponent } from './components/apply-link/apply-link.component';
import { InviteFriendComponent } from './components/invite-friend/invite-friend.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NgLetModule } from 'ng-let';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReferralsPageComponent,
    ShareLinkComponent,
    ApplyLinkComponent,
    InviteFriendComponent,
  ],
  imports: [
    HeaderComponent,
    CommonModule,
    ReferralsRoutingModule,
    NgLetModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
})
export class ReferralsModule {}
