import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteFriendComponent {
  public readonly delta$ = this.appQuery.delta$;

  constructor(private readonly appQuery: AppQuery) {}
}
