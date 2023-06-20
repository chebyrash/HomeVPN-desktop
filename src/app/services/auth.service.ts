import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

declare const AppleID: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private readonly router: Router,
    ) {}

    public async googleLogin(): Promise<void> {
        console.log(window.gapi);   
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