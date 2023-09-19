import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';

@Component({
    selector: 'app-referrals-page',
    templateUrl: './referrals-page.component.html',
    styleUrls: ['./referrals-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralsPageComponent implements OnInit {
    constructor(private readonly appService: AppService) { }

    ngOnInit(): void {
        this.appService.loadMain();
    }
}
