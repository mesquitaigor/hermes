import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import FirstNameInputComponent from './firstname-input.component';

@NgModule({
  declarations: [FirstNameInputComponent],
  exports: [FirstNameInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class FirstNameInputComponentModule {}
