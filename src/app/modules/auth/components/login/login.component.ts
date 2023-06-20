import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const handleResponse = (response: any) => {
      console.log(response);
    }
    google.accounts.id.initialize({
      client_id: "318603230447-6qjgeco2187epkkbtkid4tc5fv65efdg.apps.googleusercontent.com", // Replace with your Google Client ID
      callback: handleResponse // We choose to handle the callback in client side, so we include a reference to a function that will handle the response
    });
    // You can skip the next instruction if you don't want to show the "Sign-in" button
    google.accounts.id.renderButton(
      document.getElementById("g_id_onload"), // Ensure the element exist and it is a div to display correcctly
      { theme: "outline", size: "large" }  // Customization attributes
    );
    google.accounts.id.prompt();
  }

  async login(provider: 'apple' | 'google'): Promise<void> {
    if (provider === 'apple') {
      await this.authService.appleLogin();
    }

    if (provider === 'google') {
      google.accounts.id.prompt();
    }
  }
}