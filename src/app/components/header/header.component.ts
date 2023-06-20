import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class HeaderComponent {
    @Input() title: string | undefined;

    public readonly telegram$ = this.appQuery.telegram$;

    constructor(private readonly appQuery: AppQuery) {}
}
