import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';

@Component({
    standalone: true,
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class BalanceComponent {
    public readonly balance$ = this.appQuery.balance$;

    constructor(private readonly appQuery: AppQuery) {}
}
