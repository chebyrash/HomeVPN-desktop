import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DarwinService } from "./platform/darwin-platform.service";
import { AppService } from "../state/app.service";
import { environment } from "src/environments/environment";

declare const AppleID: any;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private readonly router: Router,
    private readonly darwinService: DarwinService,
    private readonly appService: AppService
  ) {
    window.electron.invoke("google_auth", {
      action: "init_google_auth",
      payload: {
        clientId: environment.googleOauth.id,
        clientSecret: environment.googleOauth.sec,
      },
    })
  }

  public async googleLogin(): Promise<void> {
    const response = await window.electron.invoke("google_auth", { action: 'google_auth' });
    if ((response.error)) {
      alert(`Something went wrong: ${response.error}, reason: ${response.reason}`);
    } else {
      if (!response) {
        alert('Something went wrong');
      }
      localStorage.setItem("token", response);
      localStorage.setItem("auth_provider", "Google");
      this.router.navigate(["home"]);
    }
  }

  public async appleLogin(): Promise<void> {
    try {
      AppleID.auth.init({
        clientId: "desktop.homevpn.signin",
        state: "Initial user authentication request",
        nonce: "test",
        usePopup: true,
        redirectURI: "https://desktop.homevpn.org/login",
      });
      const data = (await AppleID.auth.signIn()) as {
        authorization: { id_token: string };
      };
      localStorage.setItem("auth_provider", "Apple");
      localStorage.setItem("token", data.authorization.id_token);
      this.router.navigate(["home"]);
    } catch (error) {
      const errMessage = JSON.stringify(error);
      if (errMessage.includes('popup_closed_by_user')) {
        return;
      }
      
      alert(`Something went wrong: ${JSON.stringify(error)}`);
    }
  }

  public signOut(): void {
    localStorage.removeItem("token");
    this.appService.reset();
    this.router.navigate(["login"]).then(() => {
      localStorage.removeItem("country");
      localStorage.removeItem("auth_provider");
      return this.darwinService.wgDown();
    });
  }
}
