import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, of, switchMap, take, tap } from 'rxjs';
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

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    // this.activatedRoute.params
    //   .pipe(
    //     switchMap((params) => {
    //       if (params['forceConnect']) {
    //         return this.appService.wgUp();
    //       }

    //       return of(false);
    //     })
    //   )
    //   .subscribe((result) => {
    //     if (result) {
    //       this.appService.setConnection('on');
    //     }
    //   });

    // this.appQuery.restored$
    //   .pipe(
    //     take(1),
    //     switchMap((restored) => {
    //       console.log(restored);
    //       if (!restored) {
    //         const lastWgState = this.appQuery.state;
    //         const currentPlan = this.appQuery.currentPlan;
    //         const country = this.appQuery.country!;
    //         if (lastWgState && currentPlan && country) {
    //           return this.appService
    //             .connectionInit(country.id)
    //             .pipe(switchMap(() => this.appService.wgUp()));
    //         }
    //         return of(null);
    //       }
    //       return of(null);
    //     }),
    //     tap(() => {
    //       this.appService.setRestored(true);
    //     })
    //   )
    //   .subscribe((response) => {
    //     console.log('restore response', response);
    //   });
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

  public connectionOn() {
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
      return this.appService.connectionInit(country.id).pipe(
        switchMap(() => {
          return this.appService.wgUp();
        })
      ).subscribe(() => {
        this.appService.setConnection('on');
        this.loading$.next(false);
      })
    } else {
      this.loading$.next(true);
      return this.appService.wgUp().subscribe(() => {
        this.appService.setConnection('on');
        this.loading$.next(false);
      });
    }
  }
}
