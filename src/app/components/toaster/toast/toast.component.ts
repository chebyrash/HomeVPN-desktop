import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { ToastInternal } from '../../../models/interfaces/toast.interface';
import { ToastType } from '../enums/toast-type.enum';

const toastrTypeMap: Record<ToastType, string> = {
  [ToastType.INFO]: 'info',
  [ToastType.ERROR]: 'error',
};

@Component({
  standalone: true,
  selector: 'extension-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ToastComponent implements OnInit {
  @Input() toast!: ToastInternal;

  @Input()
  size: 's' | 'm' = 's';

  @Output()
  dispose = new EventEmitter<string>();

  get typeClass(): string[] {
    return this.toast ? [toastrTypeMap[this.toast.type], `size-${this.size}`] : [];
  }

  ngOnInit(): void {
    if (this.toast?.autoClose) {
      setTimeout(() => {
        this.dispose.emit(this.toast?.id);
      }, this.toast.autoClose);
    }
  }
}
