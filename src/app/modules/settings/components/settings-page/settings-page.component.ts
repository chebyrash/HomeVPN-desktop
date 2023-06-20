import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
    constructor(private readonly authService: AuthService) {}

    public signOut(): void {
        this.authService.signOut();
    }
}
