import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, EMPTY, Subject, distinctUntilKeyChanged, filter, from, of, skip, switchMap, takeUntil } from "rxjs";
import { AppQuery } from "src/app/state/app.query";
import { AppService } from "src/app/state/app.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly state$ = this.appQuery.connection$;

  readonly currentPlan$ = this.appQuery.currentPlan$;

  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly destroy$ = new Subject<void>();

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.appQuery.country$.pipe(
      filter(Boolean),
      distinctUntilKeyChanged('id'),
      skip(1),
      switchMap(() => {
        const currentConnection = this.appQuery.currentConnection;
        const country = this.appQuery.country;
        const processPid = this.appQuery.processPid;
        if (country?.id === this.appQuery.origin?.country) {
          alert('Connect to this country is not allowed');
          return EMPTY;
        }
        if (processPid && currentConnection && currentConnection.country !== country?.id) {
          return from(this.appService.killProcess(false)).pipe(
            switchMap(() => {
              console.log('re-init connection');
              return this.appService.initializeConnection();
            }),
            switchMap(async () => {
              return this.appService.runCore();
            }),
            switchMap(async () => {
              return this.appService.applyNetworkProxy();
            })
          );
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onStateChange(state: boolean): void {
    if (state) {
      this.on();
    } else {
      this.off();
    }
  }

  on(): void {
    const plan = this.appQuery.currentPlan;
    const country = this.appQuery.country;
    const currentConnection = this.appQuery.currentConnection;
    if (!country) {
      this.appService.openCountrySelector();
    }

    if (country?.id === this.appQuery.origin?.country) {
      alert('Connect to this country is not allowed');
      return;
    }

    if (plan) {
      if (!currentConnection || currentConnection.country !== country?.id) {
        this.loading$.next(true);
        this.appService.initializeConnection().pipe(
          switchMap(async () => this.appService.runCore()),
          switchMap(async () => this.appService.applyNetworkProxy())
        ).subscribe(() => {
          this.loading$.next(false);
        });
        return;
      } else {
        this.appService.runCore().then(() => {
          return this.appService.applyNetworkProxy();
        });
        return;
      }
    } else {
      this.router.navigate(['/shop']);
      return;
    }
  }

  off(): void {
    this.appService.killProcess().then(() => {
      return this.appService.disableNetworkProxy();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
