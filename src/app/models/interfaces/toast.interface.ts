import { WithRequiredProperty } from '../types/with-required-property.type';
import { ToastPosition } from '../../components/toaster/enums/toast-position.enum';
import { ToastType } from '../../components/toaster/enums/toast-type.enum';

export interface Toast {
  readonly type: ToastType;
  readonly text: string;
  readonly position?: ToastPosition;
  readonly title?: string;
  readonly autoClose?: number;
  readonly icon?: { key: string; size: 's' | 'm' | 'l' };
}

export interface ToastInternal extends WithRequiredProperty<Toast, 'icon'> {
  readonly id: string;
}
