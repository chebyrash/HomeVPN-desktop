import { Output, EventEmitter, ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionComponent implements OnInit {
    @Input() state: 'on' | 'off' = 'off';

    @Input() loading: boolean;

    @Output() onStateChange = new EventEmitter<'on' | 'off'>();

    constructor() { }

    ngOnInit(): void {}

    public switch(state: 'on' | 'off'): void {
        this.onStateChange.emit(state === 'on' ? 'off' : 'on');
    }
}
