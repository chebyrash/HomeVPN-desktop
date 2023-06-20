import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import {
  Router,
} from '@angular/router';
import { CurrentPlan } from 'src/app/models/interfaces/current-plan.interface';
import { ToasterService } from 'src/app/services/toastr.service';
import { ToastType } from 'src/app/components/toaster/enums/toast-type.enum';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent {
  public readonly plans$ = this.appQuery.plans$;

  public readonly currentPlan$ = this.appQuery.currentPlan$;

  public readonly planId$ = new BehaviorSubject<string>('');

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly toasterService: ToasterService
  ) {}

  public getDuration(minutes: number): string {
    const [hh, mm, ss] = new Date((minutes / 60) * 60 * 1000)
      .toISOString()
      .substr(11, 8)
      .split(':');
    let result = '';

    if ((minutes / 60) >= 1440) {
      result = `${minutes / 60 / 24} days`;
    }
    if (Number(ss)) {
      result = `${Number(ss)} seconds`;
    }
    if (Number(mm)) {
      result = `${Number(mm)} minutes` + ' ' + result;
    }
    if (Number(hh)) {
      result = `${Number(hh)} hours` + ' ' + result;
    }
    return result;
  }

  public buy(): void {
    const planId = this.planId$.getValue();
    const price = this.appQuery.plans.find(plan => plan.id === planId)?.price!;
    const balance = this.appQuery.balance;
    
    if (price > balance) {
      this.toasterService.showToast({
        type: ToastType.ERROR,
        text: 'Insufficient balance',
        autoClose: 2500
      });
      return;
    }
    
    if (planId) {
      this.appService.purchasePlan(planId).pipe(
        switchMap(() => {
          return this.appService.connectionInit();
        }),
        switchMap(() => {
          return this.appService.wgUp();
        })
      ).subscribe(() => {
        this.appService.setConnection('on');
        this.router.navigate(['/home', { forceConnect: false }]);
      });
    }
  }

  public select(id: string, currentPlan: CurrentPlan | null | undefined): void {
    if (currentPlan) {
      return;
    }

    if (id === this.planId$.getValue()) {
      this.planId$.next('');
      return;
    }

    this.planId$.next(id);
  }
}
