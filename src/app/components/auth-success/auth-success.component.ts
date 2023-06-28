import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth-success',
    templateUrl: './auth-success.component.html',
    styleUrls: ['./auth-success.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class AuthSuccessComponent implements OnInit, AfterViewInit {
    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        document.documentElement.setAttribute('style', 'width: 100% !important; height: 100% !important');
    }
}
