import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../state/app.service";
import { AuthProvider } from "../models/interfaces/auth-provider.interface";

declare const AppleID: any;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  get isAuthenticated(): boolean {
    const authProvider = localStorage.getItem("authProvider");
    return authProvider !== null;
  }

  get authProvider(): AuthProvider | null {
    const authProvider = localStorage.getItem("authProvider");
    return authProvider ? JSON.parse(authProvider) : null;
  }

  constructor(
    private readonly router: Router,
    private readonly appService: AppService
  ) {}

  async googleLogin(): Promise<void> {
    const response = await window.electron.invoke("auth", { action: "google-auth" });
    if (response.error) {
      alert(
        `Something went wrong: ${response.error}, reason: ${response.reason}`
      );
    } else {
      if (!response) {
        alert("Something went wrong");
      }
      this.setAuthProvider({ token: response, provider: "google" });
      this.router.navigate(["home"]);
    }
  }

  async appleLogin(): Promise<void> {
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
      this.setAuthProvider({
        token: data.authorization.id_token,
        provider: "apple",
      });
      this.router.navigate(["home"]);
    } catch (error) {
      const errMessage = JSON.stringify(error);
      if (errMessage.includes("popup_closed_by_user")) {
        return;
      }
      alert(`Something went wrong: ${JSON.stringify(error)}`);
    }
  }

  setAuthProvider(provider: AuthProvider): void {
    localStorage.setItem("authProvider", JSON.stringify(provider));
  }

  clearAuthProvider(): void {
    localStorage.removeItem("authProvider");
  }

  signOut(): void {
    this.clearAuthProvider();
    this.appService.reset();
    this.router.navigate(["login"]);
  }
}
