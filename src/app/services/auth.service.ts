import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

declare const AppleID: any;
declare const google: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private readonly router: Router,
    ) {}

    public async googleLogin(): Promise<void> {
        try {
            (window as any).google.accounts.id.initialize({
                client_id: '318603230447-6qjgeco2187epkkbtkid4tc5fv65efdg.apps.googleusercontent.com',
                context: 'signin',
                callback: (data: any) => {
                    console.log(data);
                }
            });
            google.accounts.id.prompt();
        } catch(error) {
            console.log(error);
        }
    }

    public async appleLogin(): Promise<void> {
        try {
            AppleID.auth.init({
                clientId: 'desktop.homevpn.signin',
                state : 'Initial user authentication request',
                nonce: 'test',
                usePopup: true,
                redirectURI: 'https://desktop.homevpn.org/login'
            });
            const data = await AppleID.auth.signIn() as { authorization: {id_token: string} };
            localStorage.setItem('token', data.authorization.id_token);
            this.router.navigate(['home']);
        } catch(error: any) {
            console.error(error);
        }
    }

    public signOut(): void {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}