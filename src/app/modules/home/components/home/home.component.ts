import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, of, switchMap } from 'rxjs';
import { DarwinService } from 'src/app/services/platform/darwin-platform.service';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public readonly state$ = this.appQuery.state$;

  public readonly currentPlan$ = this.appQuery.currentPlan$;

  public readonly loading$ = new BehaviorSubject<boolean>(false);

  public watchCountrySub$:Subscription;

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly darwinService: DarwinService
  ) {}

  public ngOnInit(): void {
    this.turnOffIpv6();
    this.installXcodeTools();
    this.watchCountrySub$ = this.appService.watchCountryChange().subscribe();
  }

  public turnOffIpv6(): void {
    this.darwinService.executeCommand('networksetup -setv6off "Wi-Fi" || true', true);
  }

  public installXcodeTools(): void {
    const { username: user } = window.systemInfo();
    this.darwinService.executeCommand('make').catch((error) => {
      if (error.originalStack.includes('command not found')) {
        document.getElementById('global-loader')!.style.display = 'flex';
        return this.darwinService.executeCommand('xcode-select --install', true).then(() => {
          return this.darwinService.executeCommand(`WITH_BASHCOMPLETION=no WITH_SYSTEMDUNITS=no WITH_WGQUICK=yes PREFIX=/usr/local make -C /Users/${user}/.homevpn/wireguard-tools/src install && chmod 777 /usr/local/bin/wg-quick`, true)
        }).then(() => {
          return this.darwinService.executeCommand('uname -a').then((response) => {
            const bashBin = response.result.stdout.includes('arm64') ? 'bash_mac_arm' : 'bash_mac_amd64';
            return this.darwinService.executeCommand(`/Users/${user}/.homevpn/overwrite-shebang.sh ${user} ${bashBin}`, true);
          });
        }).then(() => {
          document.getElementById('global-loader')!.style.display = 'none';
        })
      }
      return undefined;
    });
  }

  public onStateChange(state: 'on' | 'off'): void {
    if (state === 'off') {
      this.appService.wgDown().subscribe(() => {
        this.appService.setConnection('off');
      })
    }

    if (state === 'on') {
      this.connectionOn();
    }
  }

  public connectionOn(): void {
    const country = this.appQuery.country;
    const currentPlan = this.appQuery.currentPlan;

    if (!country) {
      this.appService.openCountrySelector().afterClosed.pipe(
        switchMap((country) => {
          if (!country) {
            return of(null);
          }
          
          if (!currentPlan) {
            return this.router.navigate(['/shop']);
          }

          return of(null);
        })
      ).subscribe();
      return;
    }

    if (!currentPlan) {
      this.router.navigate(['/shop']);
      return;
    }

    if (currentPlan.is_paid) {
      this.loading$.next(true);
      if (this.appQuery.currentConnection) {
        this.appService.connectionInit(country.id).pipe(
          switchMap(() => {
            return this.appService.wgUp();
          })
        ).subscribe(() => {
          this.appService.setConnection('on');
          this.loading$.next(false);  
        });
        return;
      } else {
        this.appService.connectionInit(country.id).pipe(
          switchMap(() => {
            return this.appService.wgUp();
          })
        ).subscribe(() => {
          this.appService.setConnection('on');
          this.loading$.next(false);
        });
        return;
      }
    } else {
      this.loading$.next(true);
      this.appService.connectionInit(country.id).pipe(
        switchMap(() => {
          return this.appService.wgUp();
        })
      ).subscribe(() => {
        this.appService.setConnection('on');
        this.loading$.next(false);
      })
      return;
    }
  }

  ngOnDestroy(): void {
    this.watchCountrySub$.unsubscribe();
  }
}
