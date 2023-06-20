import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIdComponent {
  public readonly userId$ = this.appQuery.userId$;

  constructor(private readonly appQuery: AppQuery) {}

  public async copyUserId(userId: string | null | undefined): Promise<void> {
    if (userId) {
      await navigator.clipboard.writeText(userId);
      alert('User identifier copied!');
    }
  }
}
