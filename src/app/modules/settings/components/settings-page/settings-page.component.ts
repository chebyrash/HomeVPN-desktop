import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
    public readonly authProvider = localStorage.getItem('auth_provider');
    constructor(private readonly authService: AuthService) {}

    public signOut(): void {
        this.authService.signOut();
    }
}
