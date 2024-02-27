import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import EmailInputComponent from './email-input.component';

@NgModule({
  declarations: [EmailInputComponent],
  exports: [EmailInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class EmailInputComponentModule {}
