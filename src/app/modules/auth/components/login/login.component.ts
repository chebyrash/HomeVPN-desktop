import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  async login(provider: 'apple' | 'google'): Promise<void> {
    if (provider === 'apple') {
      await this.authService.appleLogin();
    }

    if (provider === 'google') {
      await this.authService.googleLogin();
    }
  }
}
