import { Injectable } from '@angular/core';
import { AppStore } from './app.store';
import {
  EMPTY,
  Observable,
  catchError,
  distinctUntilKeyChanged,
  filter,
  from,
  of,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { Country } from '../models/interfaces/country.interface';
import { CountrySelectorComponent } from '../components/country-selector/country-selector.component';
import { DialogRef, DialogService } from '../modules/dialog';
import { AppQuery } from './app.query';
import { v4 } from 'uuid';
import { SystemInfoChannelService } from '../services/system-info-channel.service';
import { HttpChannelService } from '../services/http-channel.service';
import { MainResponse } from '../models/types/main-response.type';
import { AppState } from './app.state';
import { ConnectResponse } from '../models/types/connect-response.type';
import { CommandChannelService } from '../services/command-channel.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private readonly store: AppStore,
    private readonly dialogService: DialogService,
    private readonly appQuery: AppQuery,
    private readonly systemInfoChannelService: SystemInfoChannelService,
    private readonly httpChannelService: HttpChannelService,
    private readonly commandChannelService: CommandChannelService,
  ) {}

  openCountrySelector(): DialogRef<Country> {
    return this.dialogService.openFullscreen<
      CountrySelectorComponent,
      Country,
      unknown
    >(CountrySelectorComponent, {
      closable: true,
      title: 'Select country',
    });
  }

  loadMain(): Observable<MainResponse> {
    return this.httpChannelService.get<MainResponse>('/main').pipe(
      tap((main) => {
        console.log({ MAIN: main });
        this.store.update({ main });
      }),
      catchError((error) => {
        alert(`Error: ${error?.message}`);
        return EMPTY;
      })
    );
  }

  initializeConnection(): Observable<unknown> {
    const country = this.appQuery.country;
    const key = v4();
    return this.httpChannelService.post<ConnectResponse>('/connect/xray', {
      country: country?.id, key
    }).pipe(
      switchMap(async (response) => {
        return this.writeConfig(response.client_config);
      }),
      switchMap(() => {
        return this.loadMain();
      }),
    )
  }

  async runCore(): Promise<unknown> {
    const platform = this.appQuery.systemInfo.platform;

    if (platform === 'win') {
      return this.commandChannelService.spawn(this.appQuery.winCoreExePath, ['run', `-config=${this.appQuery.winCoreConfigPath}`]).then((pid) => {
        this.store.update({ processPid: pid });
      });
    }

    return this.commandChannelService.spawn('/usr/local/bin/core', ['run', '-config=/usr/local/share/homevpn/config.json']).then((pid) => {
      this.store.update({ processPid: pid });
    });
  }

  async applyNetworkProxy(): Promise<unknown> {
    const freePort = this.appQuery.freePort;
    const platform = this.appQuery.systemInfo.platform;

    if (platform === 'win') {
      const cmd = `netsh winhttp set proxy proxy-server="http=127.0.0.1:${freePort};https=127.0.0.1:${freePort}" bypass-list="<local>" && reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f && reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d "http=127.0.0.1:${freePort};https=127.0.0.1:${freePort}" /f`
      return this.commandChannelService.execute(
        cmd,
        'user'
      );
    }

    return this.commandChannelService.execute(
      `/usr/local/share/homevpn/iface_proxy.sh "127.0.0.1" "${freePort}" "on"`, 
      'daemon'
    );
  }

  async disableNetworkProxy(): Promise<unknown> {
    const freePort = this.appQuery.freePort;
    const platform = this.appQuery.systemInfo.platform;
    if (platform === 'win') {
      return this.commandChannelService.execute(`netsh winhttp reset proxy && reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f && reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /f`, 'user');
    }
    return this.commandChannelService.execute(`/usr/local/share/homevpn/iface_proxy.sh "127.0.0.1" "${freePort}" "off"`, 'daemon');
  }

  async killProcess(resetPid = true): Promise<unknown> {
    const processPid = this.appQuery.processPid;
    if (processPid) {
      return this.commandChannelService.kill(processPid).then(() => {
        if (resetPid) {
          this.store.update({ processPid: null });
        }
      });
    }
    return null;
  }

  async writeConfig(client_config: string): Promise<unknown> {
    const platform = this.appQuery.systemInfo.platform;
    const config = platform === 'win' ? this.adjustWindowsConfig(client_config) : this.adjustMacosConfig(client_config);

    if (platform === 'win') {
      return this.commandChannelService.execute(`powershell -command "Set-Content -Path '${this.appQuery.winCoreConfigPath}' -Value '${config}'"`, 'user');
    }

    return this.commandChannelService.execute(`echo '${config}' > /usr/local/share/homevpn/config.json && echo 'done'`, 'user');
  }

  private adjustWindowsConfig(client_config: string): string {
    const json = JSON.parse(client_config);
    const freePort = this.appQuery.freePort;
    json.inbounds =  [{
      "listen": "127.0.0.1",
      "port": `${freePort}`,
      "protocol": "http"
    }];
    return JSON.stringify(json);
  }

  private adjustMacosConfig(client_config: string): string {
    const freePort = this.appQuery.freePort;
    return client_config
      .replace('SOCKS_PORT', freePort.toString())
      .replace('::1', '127.0.0.1');
  }

  buyPlan(planId: string): Observable<MainResponse> {
    return this.httpChannelService.post('/plan/purchase', { ID: planId }).pipe(
      switchMap(() => this.loadMain()),
      catchError((error) => {
        alert(`Error: ${error?.message}`);
        return EMPTY;
      })
    );
  }

  applyReferralLink(link: string): Observable<unknown> {
    const code = link.split('/').pop() as string;
    return this.httpChannelService.post('/promo/apply', {code}).pipe(
      catchError((error) => {
        alert(`Error: ${error.message}`);
        return EMPTY;
      }),
      tap((response: any) => {
        alert("Referral code applied!");
        this.store.update((state) => {
          return ({
            ...state,
            main: {
              ...state.main,
              referral: {
                ...state.main?.referral,
                show_referral_prompt: false,
              },
              balance: (state.main?.balance || 0) + response.delta
            }
          } as AppState);
        })
      })
    )
  }

  loadSystemInfoAndPort(): Observable<unknown> {
    return zip([
      this.systemInfoChannelService.getSystemInfo(),
      this.systemInfoChannelService.getFreePort()
    ]).pipe(
      tap(([systemInfo, freePort]) => {
        this.store.update({ systemInfo, freePort });
      })
    )
  }

  setCountry(country: Country): void {
    localStorage.setItem('country', JSON.stringify(country));
    this.store.update({ country });
  }

  async reset(): Promise<void> {
    return this.disableNetworkProxy().then(() => {
      return this.killProcess();
    }).then(() => {
      this.store.update({ main: null });
    });
  }
}
