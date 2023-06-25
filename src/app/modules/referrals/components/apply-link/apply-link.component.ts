import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/state/app.service';
import { AppQuery } from 'src/app/state/app.query';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-apply-link',
    templateUrl: './apply-link.component.html',
    styleUrls: ['./apply-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyLinkComponent {
    public readonly showReferralPrompt$ = this.appQuery.showReferralPrompt$;

    public link = null;

    constructor(
        private readonly appService: AppService,
        private readonly appQuery: AppQuery
    ) {}

    public applyLink(): void {
        if (this.link) {
            this.appService.applyLink(this.link).pipe(
            ).subscribe((result) => {
                if (result.error) {
                    alert(result.error);
                } else {
                    alert('Referral code applied!');
                }
            });
        }
    }
}
