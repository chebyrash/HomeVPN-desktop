import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FullscreenDialogRootComponent } from './components/fullscreen-dialog-root.component';
import { DialogService } from './dialog.service';
import { DialogContentDirective } from './dialog-content.directive';

// TODO: move to uinch lib
@NgModule({
  declarations: [FullscreenDialogRootComponent, DialogContentDirective],
  imports: [CommonModule, OverlayModule],
  providers: [DialogService],
})
export class DialogModule {}
