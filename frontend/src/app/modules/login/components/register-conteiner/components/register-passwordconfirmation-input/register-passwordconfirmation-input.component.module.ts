import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import RegisterPasswordConfirmationInputComponent from 'src/app/modules/login/components/register-conteiner/components/register-passwordconfirmation-input/register-passwordconfirmation-input.component';
import HsmInputComponentModule from 'src/app/shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [RegisterPasswordConfirmationInputComponent],
  exports: [RegisterPasswordConfirmationInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class RegisterPasswordConfirmationInputComponentModule {}
