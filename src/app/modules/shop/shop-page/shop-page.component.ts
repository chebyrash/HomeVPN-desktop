import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AppQuery } from "src/app/state/app.query";
import { AppService } from "src/app/state/app.service";
import { BehaviorSubject, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { CurrentPlan } from "src/app/models/interfaces/current-plan.interface";

@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent {
  public readonly plans$ = this.appQuery.plans$;

  public readonly currentPlan$ = this.appQuery.currentPlan$;

  public readonly planId$ = new BehaviorSubject<string>("");

  public readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly router: Router
  ) {}

  public getDuration(seconds: number): string {
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

  public buy(): void {
    const planId = this.planId$.getValue();
    const price = this.appQuery.plans.find((plan) => plan.id === planId)
      ?.price!;
    const balance = this.appQuery.balance;
    const country = this.appQuery.country;

    if (!country) {
      this.loading$.next(true);
      this.appService.purchasePlan(planId).subscribe(() => {
        this.loading$.next(false);
        this.router.navigate(["/home"]);
      });
      return;
    }

    if (price > balance) {
      alert("Insufficient balance!");
      return;
    }

    if (planId) {
      this.loading$.next(true);
      this.appService
        .purchasePlan(planId)
        .pipe(
          switchMap(() => {
            return this.appService.connectionInit();
          }),
          switchMap(() => {
            return this.appService.wgUp();
          })
        )
        .subscribe(() => {
          this.loading$.next(false);
          this.appService.setConnection("on");
          this.router.navigate(["/home"]);
        });
    }
  }

  public select(id: string, currentPlan: CurrentPlan | null | undefined): void {
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
