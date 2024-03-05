import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicChildLoader]',
})
export class DynamicChildLoaderDirective {
  @Input() uuid = '';
  constructor(public viewContainerRef: ViewContainerRef) {}
}
