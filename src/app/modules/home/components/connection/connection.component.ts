import { Output, EventEmitter, ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionComponent {
    @Input() state: boolean = false;

    @Input() loading: boolean;

    @Output() onStateChange = new EventEmitter<boolean>();

    public switch(state: boolean): void {
        this.onStateChange.emit(!state);
    }
}
