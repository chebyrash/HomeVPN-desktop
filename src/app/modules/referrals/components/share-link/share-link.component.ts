import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastType } from 'src/app/components/toaster/enums/toast-type.enum';
import { ToasterService } from 'src/app/services/toastr.service';
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

    constructor(
        private readonly appQuery: AppQuery,
        private readonly toasterService: ToasterService
    ) {}

    public async copy(link: string | null | undefined): Promise<void> {
        if (link) {
            await navigator.clipboard.writeText(link);
            this.toasterService.showToast({
                text: 'Link copied!',
                type: ToastType.INFO,
                autoClose: 2000
            })
        }
    }
}
