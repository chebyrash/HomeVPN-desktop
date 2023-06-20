import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'src/app/modules/dialog';
import { CountrySelectorComponent } from '../../../../components/country-selector/country-selector.component';
import { AppQuery } from 'src/app/state/app.query';

@Component({
    selector: 'app-destination',
    templateUrl: './destination.component.html',
    styleUrls: ['./destination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationComponent implements OnInit {
    public readonly country$ = this.appQuery.country$;
    
    constructor(
        private readonly dialogService: DialogService,
        private readonly appQuery: AppQuery,
    ) { }

    ngOnInit(): void {}

    public openCountrySelector(): void {
        this.dialogService.openFullscreen(CountrySelectorComponent, {
            closable: true,
            title: 'Select country'
        });
    }
}
