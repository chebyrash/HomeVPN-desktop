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

  readonly systemInfo = this.appQuery.systemInfo;

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
    const appLogPath = '/var/log/homevpn/homevpn_app.log';
    const daemonErrLog = '/var/log/homevpn/homevpn_daemon.err.log';
    const daemonLog = '/var/log/homevpn/homevpn_daemon.log';
    this.commandChannelService
      .execute(
        `rm -rf ${supportFilePath}; cat ${appLogPath} >> ${supportFilePath}; cat ${daemonErrLog} >> ${supportFilePath}; cat ${daemonLog} >> ${supportFilePath}; echo 'done'`,
        "daemon"
      )
      .then(() => {
        alert("Done! Share file homevpn_support with dev team");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }
}
