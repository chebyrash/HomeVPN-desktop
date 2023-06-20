import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';

@Component({
    selector: 'app-share-link',
    templateUrl: './share-link.component.html',
    styleUrls: ['./share-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareLinkComponent {
    link$ = this.appQuery.referralLink$;

    stats$ = this.appQuery.referralStats$;

    constructor(private readonly appQuery: AppQuery) {}

    public async copy(link: string | null | undefined): Promise<void> {
        if (link) {
            await navigator.clipboard.writeText(link);
            alert('Referral link copied!');
        }
    }
}
