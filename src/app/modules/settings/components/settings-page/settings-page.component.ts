import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  readonly authProvider = this.authService.authProvider;

  constructor(
    private readonly authService: AuthService,
  ) {}

  signOut(): void {
    this.authService.signOut();
  }

  shareLogs(): void {
    alert("Done!");
    // const user = window.systemInfo().user.username;
    // this.darwinService
    //   .executeCommand(
    //     `mv /tmp/homevpn.log /Users/vlad/Desktop/ && install -m 777 /dev/null /tmp/homevpn.log`,
    //     true
    //   )
    //   .then(() => {
    //     alert("Done!");
    //   });
  }
}
