import { OverlayConfig } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export interface DialogConfig<Data = unknown> {
  title: string;
  closable: boolean;
  data?: Data;
  overlayConfig?: OverlayConfig;
  leftAction?: {
    icon?: string;
    callback?: () => void;
  };
  rightAction?: {
    icon?: string;
    callback?: () => void;
  };
}

export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('DIALOG_CONFIG');
