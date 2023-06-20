import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/state/app.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    constructor(private readonly appService: AppService) {}

    ngOnInit(): void {
        this.appService.loadMain().subscribe();
    }
}
