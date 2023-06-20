import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ToastType } from '../components/toaster/enums/toast-type.enum';
import { ToasterHostComponent } from '../components/toaster/toaster-host.component';
import { Toast, ToastInternal } from '../models/interfaces/toast.interface';
import { ToastPosition } from '../components/toaster/enums/toast-position.enum';

const TOAST_DEFAULT_ICON: Record<ToastType, { key: string; size: 's' | 'm' | 'l' }> = {
  [ToastType.ERROR]: { key: 'error', size: 's' },
  [ToastType.INFO]: { key: 'done_filled', size: 's' },
};

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private readonly _toasterEvents$ = new Subject<ToastInternal>();

  readonly toasterEvents$ = this._toasterEvents$.asObservable();

  constructor(private readonly overlay: Overlay) {}

  showToast(toast: Toast): void {
    this._toasterEvents$.next({
      ...toast,
      position: ToastPosition.TOP,
      id: Date.now().toString(),
      icon: toast.icon || TOAST_DEFAULT_ICON[toast.type],
    });
  }

  init() {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy,
    });

    const overlayRef = this.overlay.create(overlayConfig);
    const toasterHostPortal = new ComponentPortal(ToasterHostComponent);

    overlayRef.attach(toasterHostPortal);
  }
}
