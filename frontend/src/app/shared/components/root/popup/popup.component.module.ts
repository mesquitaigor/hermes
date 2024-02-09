import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicChildLoaderDirective } from 'src/app/shared/components/root/popup/dynamic-child-loader.directive';
import PopupComponent from 'src/app/shared/components/root/popup/popup.component';

@NgModule({
  declarations: [PopupComponent, DynamicChildLoaderDirective],
  exports: [PopupComponent],
  imports: [CommonModule],
})
export default class PopupComponentModule {}
