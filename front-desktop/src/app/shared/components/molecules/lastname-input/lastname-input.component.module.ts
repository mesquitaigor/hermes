import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import LastNameInputComponent from './lastname-input.component';

@NgModule({
  declarations: [LastNameInputComponent],
  exports: [LastNameInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class LastNameInputComponentModule {}
