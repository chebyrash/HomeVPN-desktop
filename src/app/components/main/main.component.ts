import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    constructor(private readonly appService: AppService, private readonly appQuery: AppQuery) {}

    ngOnInit(): void {
        this.appService.loadMain().subscribe();
        this.appQuery.select().subscribe(console.log);
    }
}
