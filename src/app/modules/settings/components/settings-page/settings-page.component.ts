import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { CommandChannelService } from "src/app/services/command-channel.service";
import { AppQuery } from "src/app/state/app.query";

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
    private readonly commandChannelService: CommandChannelService,
    private readonly appQuery: AppQuery
  ) {}

  signOut(): void {
    this.authService.signOut();
  }

  shareLogs(): void {
    const user = this.appQuery.systemInfo.user.username;
    const supportFilePath = `/Users/${user}/Desktop/homevpn_support`;
    this.commandChannelService.execute(`rm -rf ${supportFilePath}; cat /tmp/homevpn_daemon.log >> ${supportFilePath}; cat /tmp/homevpn_daemon.err.log >> ${supportFilePath}; cat /tmp/homevpn.log >> ${supportFilePath}; echo 'done'`, 'daemon').then((response) => {
      alert('Done! Share file homevpn_support with dev team');
    }).catch(() => {
      alert('Something went wrong');
    });
  }
}
