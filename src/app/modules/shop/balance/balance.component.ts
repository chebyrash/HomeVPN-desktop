import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
    readonly balance$ = this.appQuery.balance$;

    constructor(private readonly appQuery: AppQuery) {}
}
