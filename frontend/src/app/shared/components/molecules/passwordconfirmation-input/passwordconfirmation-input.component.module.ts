import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import RegisterPasswordConfirmationInputComponent from './passwordconfirmation-input.component';

@NgModule({
  declarations: [RegisterPasswordConfirmationInputComponent],
  exports: [RegisterPasswordConfirmationInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class PasswordConfirmationInputComponentModule {}
