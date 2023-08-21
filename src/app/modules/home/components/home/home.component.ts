import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription, of, switchMap, tap } from "rxjs";
import { AppQuery } from "src/app/state/app.query";
import { AppService } from "src/app/state/app.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public readonly state$ = this.appQuery.state$;

  public readonly currentPlan$ = this.appQuery.currentPlan$;

  public readonly loading$ = new BehaviorSubject<boolean>(false);

  public watchCountrySub$: Subscription;

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    localStorage.setItem("version", environment.appVersion);
    this.watchCountrySub$ = this.appService.watchCountryChange().subscribe();
  }

  public onStateChange(state: "on" | "off"): void {
    if (state === "off") {
      this.appService.wgDown().subscribe(() => {
        this.appService.setConnection("off");
      });
    }

    if (state === "on") {
      this.connectionOn();
    }
  }

  public connectionOn(): void {
    const country = this.appQuery.country;
    const currentPlan = this.appQuery.currentPlan;

    if (!country) {
      this.appService
        .openCountrySelector()
        .afterClosed.pipe(
          switchMap((country) => {
            if (!country) {
              return of(null);
            }

            if (!currentPlan) {
              return this.router.navigate(["/shop"]);
            }

            if (currentPlan) {
              return this.appService.connectionInit(country.id).pipe(
                switchMap(() => {
                  return this.appService.wgUp();
                }),
                tap(() => {
                  this.appService.setConnection("on");
                  this.loading$.next(false);
                })
              );
            }

            return of(null);
          })
        )
        .subscribe();
      return;
    }

    if (!currentPlan) {
      this.router.navigate(["/shop"]);
      return;
    }

    if (currentPlan.is_paid) {
      this.loading$.next(true);
      if (this.appQuery.currentConnection) {
        this.appService
          .connectionInit(country.id)
          .pipe(
            switchMap(() => {
              return this.appService.wgUp();
            })
          )
          .subscribe(() => {
            this.appService.setConnection("on");
            this.loading$.next(false);
          });
        return;
      } else {
        this.appService
          .connectionInit(country.id)
          .pipe(
            switchMap(() => {
              return this.appService.wgUp();
            })
          )
          .subscribe(() => {
            this.appService.setConnection("on");
            this.loading$.next(false);
          });
        return;
      }
    } else {
      this.loading$.next(true);
      this.appService
        .connectionInit(country.id)
        .pipe(
          switchMap(() => {
            return this.appService.wgUp();
          })
        )
        .subscribe(() => {
          this.appService.setConnection("on");
          this.loading$.next(false);
        });
      return;
    }
  }

  ngOnDestroy(): void {
    this.watchCountrySub$.unsubscribe();
  }
}
