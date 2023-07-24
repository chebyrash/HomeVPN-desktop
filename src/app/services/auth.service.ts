import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DarwinService } from "./platform/darwin-platform.service";
import { AppService } from "../state/app.service";

declare const AppleID: any;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private readonly router: Router,
    private readonly darwinService: DarwinService,
    private readonly appService: AppService
  ) {}

  public async googleLogin(): Promise<void> {
    try {
      const token = await window.electron.invoke("google_auth");
      localStorage.setItem("token", token);
      localStorage.setItem("auth_provider", "Google");
      this.router.navigate(["home"]);
    } catch (error) {
      console.error(JSON.stringify(error));
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
      console.error(JSON.stringify(error));
    }
  }

  public signOut(): void {
    localStorage.removeItem("token");
    this.appService.reset();
    this.router.navigate(["login"]).then(() => {
      localStorage.removeItem('country');
      localStorage.removeItem('auth_provider');
      return this.darwinService.wgDown();
    });
  }
}
