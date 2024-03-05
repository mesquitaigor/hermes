import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import DynamicChildLoaderDirectiveModule from '../../../directives/dynamic-child-loader/dynamic-child-loader.directive.module';
import PopupComponent from './popup.component';

@NgModule({
  declarations: [PopupComponent],
  exports: [PopupComponent],
  imports: [CommonModule, DynamicChildLoaderDirectiveModule],
})
export default class PopupComponentModule {}
