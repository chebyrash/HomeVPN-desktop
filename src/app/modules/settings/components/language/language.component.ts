import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
