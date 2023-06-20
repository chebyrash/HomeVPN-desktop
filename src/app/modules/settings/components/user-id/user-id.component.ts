import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastType } from 'src/app/components/toaster/enums/toast-type.enum';
import { ToasterService } from 'src/app/services/toastr.service';
import { AppQuery } from 'src/app/state/app.query';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIdComponent {
  public readonly userId$ = this.appQuery.userId$;

  constructor(
    private readonly appQuery: AppQuery,
    private readonly toasterService: ToasterService
  ) {}

  public async copyUserId(userId: string | null | undefined): Promise<void> {
    if (userId) {
      await navigator.clipboard.writeText(userId);
      this.toasterService.showToast({
        type: ToastType.INFO,
        text: 'user id copied!',
        autoClose: 2000
      })
    }
  }
}
