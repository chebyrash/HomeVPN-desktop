import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';

import { FullscreenDialogRootComponent } from './components/fullscreen-dialog-root.component';
import { DIALOG_CONFIG, DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private readonly overlay: Overlay, private readonly injector: Injector) {}

  openFullscreen<C, R, D>(component: ComponentType<C>, config: DialogConfig<D>): DialogRef<R> {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      panelClass: 'fullscreen-dialog-panel',
      positionStrategy,
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const dialogRef = new DialogRef<R>(overlayRef);
    dialogRef.componentInstance = this.attachFullscreenDialogContainer<C, R, D>(
      overlayRef,
      component,
      dialogRef,
      config,
    );
    return dialogRef;
  }

  private attachFullscreenDialogContainer<C, R, D>(
    overlayRef: OverlayRef,
    component: ComponentType<C>,
    dialogRef: DialogRef<R>,
    config: DialogConfig<D>,
  ): FullscreenDialogRootComponent {
    const injector = this.createInjector<R, D>(dialogRef, config);
    const portal = new ComponentPortal(FullscreenDialogRootComponent, null, injector);
    const ref = overlayRef.attach(portal);
    ref.instance.componentType = component;
    return ref.instance;
  }

  private createInjector<R, D>(dialogRef: DialogRef<R>, config: DialogConfig<D>): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: DialogRef<R>,
          useValue: dialogRef,
        },
        {
          provide: DIALOG_CONFIG,
          useValue: config,
        },
      ],
    });
  }
}
