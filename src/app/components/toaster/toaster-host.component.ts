import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

import { ToastInternal } from '../../models/interfaces/toast.interface';
import { ToasterService } from '../../services/toastr.service';
import { ToastPosition } from './enums/toast-position.enum';
import { ToastComponent } from './toast/toast.component';

import { animate, style, transition, trigger } from '@angular/animations';

export const uinchFadeIn = trigger('uinchFadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms ease-in-out', style({ opacity: 0 })),
  ]),
]);


function isBottomToast(toast: ToastInternal): boolean {
  return toast.position === ToastPosition.BOTTOM;
}

@Component({
  standalone: true,
  selector: 'extension-toaster-host',
  templateUrl: './toaster-host.component.html',
  styleUrls: ['./toaster-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ToastComponent],
  animations: [uinchFadeIn],
})
export class ToasterHostComponent implements OnInit {
  private readonly toasts$ = new BehaviorSubject<ReadonlyArray<ToastInternal>>([]);

  readonly topToasts$ = this.toasts$.pipe(
    map((toasts) => toasts.filter((toast) => !isBottomToast(toast))),
    tap(console.log)
  );

  readonly bottomToasts$ = this.toasts$.pipe(
    map((toasts) => toasts.filter((toast) => isBottomToast(toast))),
  );

  constructor(
    private readonly toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.toasterService.toasterEvents$.subscribe((toast) => {
      console.log(toast);
      const toasts = this.toasts$.getValue();
      this.toasts$.next([...toasts, toast]);
    });
  }

  onDispose(id: string): void {
    const toasts = this.toasts$.getValue().filter((toast) => toast.id !== id);
    this.toasts$.next(toasts);
  }
}
