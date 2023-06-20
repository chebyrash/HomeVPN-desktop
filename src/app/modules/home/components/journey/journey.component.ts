import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppQuery } from 'src/app/state/app.query';

@Component({
    selector: 'app-journey',
    templateUrl: './journey.component.html',
    styleUrls: ['./journey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JourneyComponent implements OnInit {
    public readonly delta$ = this.appQuery.delta$;

    constructor(
        private readonly router: Router,
        private readonly appQuery: AppQuery
    ) { }

    ngOnInit(): void {}

    public goToReferrals(): void {
        this.router.navigate(['/referrals']);
    }

    public goToShop(): void {
        this.router.navigate(['/shop']);
    }
}
