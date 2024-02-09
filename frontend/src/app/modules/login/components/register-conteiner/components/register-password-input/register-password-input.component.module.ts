import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import RegisterPasswordInputComponent from './register-password-input.component';
import PasswordLevelPopupComponentModule from '../password-level-popup/password-level-popup.component.module';

@NgModule({
  declarations: [RegisterPasswordInputComponent],
  exports: [RegisterPasswordInputComponent],
  imports: [
    CommonModule,
    HsmInputComponentModule,
    PasswordLevelPopupComponentModule,
  ],
})
export default class RegisterPasswordInputComponentModule {}
