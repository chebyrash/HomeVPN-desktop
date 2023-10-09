import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  EMPTY,
  filter,
  from,
  interval,
  of,
  startWith,
  switchMap,
  take,
} from "rxjs";
import { AppQuery } from "src/app/state/app.query";
import { AppService } from "src/app/state/app.service";
import { getFlagEmoji } from "src/app/utils/get-country-flag";

@Component({
  selector: "app-active-plan",
  templateUrl: "./active-plan.component.html",
  styleUrls: ["./active-plan.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivePlanComponent implements OnInit {
  readonly connection$ = this.appQuery.connection$;

  readonly currentPlan$ = this.appQuery.currentPlan$;

  readonly timer$ = this.appQuery.currentPlan$.pipe(
    filter(Boolean),
    switchMap((plan) => {
      return interval(1000).pipe(
        startWith(-1),
        switchMap(() => {
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;
          const remainingTime = new Date(
            plan!.end_date_unix * 1000 - Date.now()
          ).getTime();
          let timer: string = "";

          if (remainingTime <= 0) {
            return from(this.appService.disableNetworkProxy()).pipe(
              switchMap(() => this.appService.killProcess()),
              switchMap(() => this.appService.loadMain()),
              take(1)
            );
          }

          const daysLeft = Math.trunc(remainingTime / day);
          const hoursLeft = Math.trunc((remainingTime % day) / hour);
          const minutesLeft = Math.trunc((remainingTime % hour) / minute);
          const secondsLeft = Math.trunc((remainingTime % minute) / second);
          if (daysLeft) {
            timer = timer + `${daysLeft}d `;
          }
          if (hoursLeft) {
            timer = timer + `${hoursLeft}h `;
          }
          if (minutesLeft) {
            timer = timer + `${minutesLeft}m `;
          }
          if (secondsLeft) {
            timer = timer + `${secondsLeft}s`;
          }
          return of(timer);
        })
      );
    })
  );

  readonly ipInfo$ = this.appQuery.ipInfo$;

  readonly getFlagEmoji = getFlagEmoji;

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.appQuery.currentPlan$.subscribe();
  }
}
