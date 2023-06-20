import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { noop } from 'rxjs';

import { DIALOG_CONFIG, DialogConfig } from '../dialog-config';
import { DialogContentDirective } from '../dialog-content.directive';
import { DialogRef } from '../dialog-ref';

export enum AnimationState {
  Void = 'void',
  Enter = 'enter',
  Leave = 'leave',
}

@Component({
  selector: 'extension-fullscreen-dialog-root',
  templateUrl: './fullscreen-dialog-root.component.html',
  styleUrls: ['./fullscreen-dialog-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animation', [
      state(
        `${AnimationState.Void}`,
        style({
          right: '-450px',
        }),
      ),
      state(
        `${AnimationState.Leave}`,
        style({
          right: '-450px',
        }),
      ),
      state(
        `${AnimationState.Enter}`,
        style({
          right: '0',
        }),
      ),
      transition(`* => *`, animate('150ms ease-in-out')),
    ]),
  ],
})
export class FullscreenDialogRootComponent implements AfterViewInit, OnDestroy {
  public animationState: AnimationState = AnimationState.Enter;

  public animationStateChanged = new EventEmitter<AnimationEvent>();

  public componentType: Type<unknown>;

  public componentRef: ComponentRef<unknown>;

  public readonly noop = noop;

  @ViewChild(DialogContentDirective, { static: false })
  contentInsertionPoint: DialogContentDirective;

  @HostBinding('@animation') get hostAnimation() {
    return {
      value: this.animationState,
    };
  }

  @HostListener('@animation.start', ['$event'])
  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  @HostListener('@animation.done', ['$event'])
  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  @HostListener('document:keydown.esc')
  onEscPressed(): void {
    this.dialogRef.close();
  }

  constructor(
    public readonly dialogRef: DialogRef,
    private readonly cdr: ChangeDetectorRef,
    @Inject(DIALOG_CONFIG) public readonly dialogConfig: DialogConfig,
  ) {}

  public ngAfterViewInit(): void {
    this.renderComponent();
    this.cdr.detectChanges();
  }

  public startLeaveAnimation(): void {
    this.animationState = AnimationState.Leave;
    this.cdr.markForCheck();
  }

  public close(): void {
    this.dialogRef.close();
  }

  private renderComponent(): void {
    this.contentInsertionPoint?.viewContainerRef.clear();
    if (this.componentType) {
      this.contentInsertionPoint?.viewContainerRef.createComponent(this.componentType);
    }
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
