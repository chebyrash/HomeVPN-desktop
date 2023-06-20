/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[dialogContent]' })
export class DialogContentDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}
