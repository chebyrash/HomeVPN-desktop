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
      catchError((error) => {
        console.error(error);
        alert(`Something went wrong: ${error}`);
        return EMPTY;
      }),
      tap((main) => {
        console.log({ MAIN: main });
        this.store.update({ main });
      })
    );
  }

  enableVPN(): Observable<any> {
    const country = this.appQuery.country;
    const key = v4();
    const currentConnection = this.appQuery.currentConnection;
    const currentPlan = this.appQuery.currentPlan;
    const origin = this.appQuery.origin;
    const freePort = this.appQuery.freePort;

    if (origin && origin.country === country?.id) {
      alert('Not allowed country');
      return EMPTY;
    }

    if (true) {
      return this.httpChannelService.post<ConnectResponse>('/connect/xray', {
        country: country?.id, key
      }).pipe(
        switchMap(connectResponse => {
          return this.writeConfig(connectResponse.client_config).then(console.log);
        }),
        switchMap(async () => {
          console.log('process pid')
          if (this.appQuery.processPid) {
            return this.commandChannelService.kill(this.appQuery.processPid).then(() => {
              return this.commandChannelService.spawn('core', ['run', '-config=/usr/local/share/homevpn/config.json'])
                .then((response) => {
                  console.log(response);
                  this.store.update({ processPid: response });
                }).then(() => {
                  return this.commandChannelService.execute(`/usr/local/share/homevpn/iface_proxy.sh "127.0.0.1" "${freePort}" "on"`, 'daemon');
                })
            })
          }
          return this.commandChannelService.spawn('core', ['run', '-config=/usr/local/share/homevpn/config.json'])
            .then((response) => {
              console.log(response);
              this.store.update({ processPid: response });
            }).then(() => {
              return this.commandChannelService.execute(`/usr/local/share/homevpn/iface_proxy.sh "127.0.0.1" "${freePort}" "on"`, 'daemon');
            })
        }),
      );
    } else {
      return from(this.commandChannelService.spawn('core', ['run', '-configdir=/usr/local/share/homevpn/config.json']).then((response) => {
        this.store.update({ processPid: response.pid });
      }));
    }
  }

  async disableVPN(updatePid = true): Promise<unknown> {
    const processPid = this.appQuery.processPid;
    const freePort = this.appQuery.freePort;
    if (processPid) {
      return this.commandChannelService.execute(`/usr/local/share/homevpn/iface_proxy.sh 127.0.0.1 ${freePort} "off"`, 'daemon').then(() => {
        return this.commandChannelService.kill(processPid);
      }).then(() => {
        if (updatePid) {
          this.store.update({ processPid: null });
        }
      });
    }

    return null;
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
      })
    )
  }

  async runCore(): Promise<unknown> {
    return this.commandChannelService.spawn('core', ['run', '-config=/usr/local/share/homevpn/config.json']).then((pid) => {
      this.store.update({ processPid: pid })
    });
  }

  async applyNetworkProxy(): Promise<unknown> {
    const freePort = this.appQuery.freePort;
    return this.commandChannelService.execute(`/usr/local/share/homevpn/iface_proxy.sh 127.0.0.1 ${freePort} "on"`, 'daemon');
  }

  async disableNetworkProxy(): Promise<unknown> {
    const freePort = this.appQuery.freePort;
    return this.commandChannelService.execute(`/usr/local/share/homevpn/iface_proxy.sh 127.0.0.1 ${freePort} "off"`, 'daemon');
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
    const freePort = this.appQuery.freePort;
    const config = client_config
      .replace('SOCKS_PORT', freePort.toString())
      .replace('::1', '127.0.0.1');
    console.log(config);
    return this.commandChannelService.execute(`echo '${config}' > /usr/local/share/homevpn/config.json`, 'user');
  }

  buyPlan(planId: string): Observable<MainResponse> {
    return this.httpChannelService.post('/plan/purchase', { ID: planId }).pipe(
      tap(console.log),
      switchMap(() => this.loadMain())
    );
  }

  applyReferralLink(link: string): Observable<unknown> {
    const code = link.split('/').pop() as string;
    return this.httpChannelService.post('/promo/apply', {code}).pipe(
      tap((response: any) => {
        this.store.update((state) => {
          return ({
            ...state,
            main: {
              ...state.main,
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

  reset(): void {
    this.disableVPN().then(() => {
      this.store.reset();
    });
  }
}
