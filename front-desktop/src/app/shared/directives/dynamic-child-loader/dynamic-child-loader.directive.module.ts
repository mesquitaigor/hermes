import { NgModule } from '@angular/core';
import { DynamicChildLoaderDirective } from '@directives/dynamic-child-loader/dynamic-child-loader.directive';

@NgModule({
  declarations: [DynamicChildLoaderDirective],
  exports: [DynamicChildLoaderDirective],
})
export default class DynamicChildLoaderDirectiveModule {}
