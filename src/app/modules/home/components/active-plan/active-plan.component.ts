import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable, filter, finalize, interval, map, of, startWith, switchMap, take, takeUntil, tap } from 'rxjs';
import { CurrentPlan } from 'src/app/models/interfaces/current-plan.interface';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';
import { getFlagEmoji } from 'src/app/utils/get-country-flag';

@Component({
    selector: 'app-active-plan',
    templateUrl: './active-plan.component.html',
    styleUrls: ['./active-plan.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivePlanComponent implements OnInit {
    public readonly connection$ = this.appQuery.state$;

    public readonly currentPlan$ = this.appQuery.currentPlan$;

    public readonly timer$ = this.appQuery.currentPlan$.pipe(
        filter(Boolean),
        switchMap(plan => {
            return interval(1000).pipe(
                startWith(-1),
                switchMap(() => {
                    const second = 1000;
                    const minute = second * 60;
                    const hour = minute * 60;
                    const day = hour * 24;
                    const remainingTime = new Date(plan!.end_date_unix * 1000 - Date.now()).getTime();
                    let timer: string = '';

                    if (remainingTime <= 0) {
                        this.appService.setConnection('off')
                        return this.appService.loadMain().pipe(
                            switchMap(() => this.appService.wgDown()),
                            switchMap(() => EMPTY)
                        );
                    }

                    const daysLeft = Math.trunc(remainingTime / day);
                    const hoursLeft = Math.trunc((remainingTime % day) / hour);
                    const minutesLeft = Math.trunc((remainingTime % hour) / minute);
                    const secondsLeft = Math.trunc((remainingTime % minute) / second);
                    if (daysLeft) {
                        timer = timer + `${daysLeft}d `
                    }
                    if (hoursLeft) {
                        timer = timer + `${hoursLeft}h `
                    }
                    if (minutesLeft) {
                        timer = timer + `${minutesLeft}m `
                    }
                    if (secondsLeft) {
                        timer = timer + `${secondsLeft}s`;
                    }
                    return of(timer);
                })
            )
        })
    );
        
    public readonly ipInfo$ = this.appQuery.ipInfo$;

    public readonly getFlagEmoji = getFlagEmoji;
    
    constructor(
        private readonly appQuery: AppQuery,
        private readonly appService: AppService
    ) { }

    ngOnInit(): void {
        this.appQuery.currentPlan$.subscribe();
    }
}
