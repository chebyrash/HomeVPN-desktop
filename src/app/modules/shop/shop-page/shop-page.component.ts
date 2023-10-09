import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AppQuery } from "src/app/state/app.query";
import { AppService } from "src/app/state/app.service";
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  finalize,
  switchMap,
  map,
} from "rxjs";
import { Router } from "@angular/router";
import { CurrentPlan } from "src/app/models/interfaces/current-plan.interface";

@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent {
  readonly plans$ = this.appQuery.plans$;

  readonly hasActivePlan$ = this.appQuery.currentPlan$.pipe(
    map((currentPlan) => {
      return currentPlan && currentPlan.end_date_unix * 1000 >= Date.now();
    })
  );

  readonly currentPlan$ = this.appQuery.currentPlan$;

  readonly planId$ = new BehaviorSubject<string>("");

  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly router: Router
  ) {}

  getDuration(seconds: number): string {
    let totalMinutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let totalHours = Math.floor(totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;
    let days = Math.floor(totalHours / 24);
    let hours = totalHours % 24;

    let result = "";

    if (days) {
      if (days === 1) {
        result += `${days} day `;
      } else {
        result += `${days} days `;
      }
    }

    if (hours) {
      result += `${hours} hours `;
    }
    if (remainingMinutes) {
      result += `${remainingMinutes} minutes `;
    }
    if (remainingSeconds) {
      result += `${remainingSeconds} seconds`;
    }

    return result.trim();
  }

  buy(): void {
    const planId = this.planId$.getValue();
    const price = this.appQuery.plans.find((plan) => plan.id === planId)
      ?.price!;
    const balance = this.appQuery.balance;
    const country = this.appQuery.country;
    if (price > balance) {
      alert("Insufficient balance!");
      return;
    }

    if (country?.id === this.appQuery.origin?.country) {
      alert("Access to this country is not allowed!");
      return;
    }

    if (planId) {
      this.loading$.next(true);
      this.appService
        .buyPlan(planId)
        .pipe(
          switchMap(() => {
            if (!country) {
              return this.router.navigate(["/home"]);
            }

            return this.appService.initializeConnection().pipe(
              switchMap(() => {
                return this.appService.runCore();
              }),
              switchMap(() => {
                return this.appService.applyNetworkProxy();
              }),
              switchMap(() => {
                return this.router.navigate(["/home"]);
              }),
              catchError((error) => {
                alert(`Error: ${error?.message}`);
                return EMPTY;
              })
            );
          }),
          finalize(() => this.loading$.next(false))
        )
        .subscribe(() => {
          this.loading$.next(false);
        });
    }
  }

  select(id: string, currentPlan: CurrentPlan | null | undefined): void {
    if (currentPlan) {
      return;
    }

    if (id === this.planId$.getValue()) {
      this.planId$.next("");
      return;
    }

    this.planId$.next(id);
  }
}
