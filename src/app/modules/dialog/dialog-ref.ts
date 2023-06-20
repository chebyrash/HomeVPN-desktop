import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import {
  AnimationState,
  FullscreenDialogRootComponent,
} from './components/fullscreen-dialog-root.component';

export class DialogRef<Result = unknown> {
  private readonly beforeClosed$: Subject<void> = new Subject<void>();
  private readonly afterClosed$: Subject<Result> = new Subject<Result>();

  public componentInstance: FullscreenDialogRootComponent | null;

  constructor(private readonly overlayRef: OverlayRef) {
    overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => {
        this.close.bind(this);
      });
  }

  public get beforeClosed(): Observable<void> {
    return this.beforeClosed$.asObservable();
  }

  public get afterClosed(): Observable<Result> {
    return this.afterClosed$.asObservable();
  }

  public close(data?: Result): void {
    this.componentInstance?.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'start'),
        take(1),
      )
      .subscribe(() => {
        this.beforeClosed$.next();
        this.beforeClosed$.complete();
        this.overlayRef.detachBackdrop();
      });

    this.componentInstance?.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'done' && event.toState === AnimationState.Leave),
        take(1),
      )
      .subscribe(() => {
        this.overlayRef.dispose();
        this.afterClosed$.next(data as Result);
        this.afterClosed$.complete();
        this.componentInstance = null;
      });

    this.componentInstance?.startLeaveAnimation();
  }
}
