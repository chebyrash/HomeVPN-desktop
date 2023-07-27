import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { DarwinService } from "src/app/services/platform/darwin-platform.service";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  public readonly authProvider = localStorage.getItem("auth_provider");

  constructor(
    private readonly authService: AuthService,
    private readonly darwinService: DarwinService
  ) {}

  public signOut(): void {
    this.authService.signOut();
  }

  public shareLogs(): void {
    const user = window.systemInfo().user.username;
    this.darwinService
      .executeCommand(
        `mv /tmp/homevpn.log /Users/${user}/Desktop/ && install -m 777 /dev/null /tmp/homevpn.log`,
        true
      )
      .then(() => {
        alert("Done!");
      });
  }
}
