import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import PasswordLevelPopupComponentModule from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/password-level-popup.component.module';
import RegisterPasswordInputComponent from 'src/app/modules/login/components/register-conteiner/components/register-password-input/register-password-input.component';
import HsmInputComponentModule from 'src/app/shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [RegisterPasswordInputComponent],
  exports: [RegisterPasswordInputComponent],
  imports: [
    CommonModule,
    HsmInputComponentModule,
    PasswordLevelPopupComponentModule,
  ],
})
export default class RegisterLastNameInputComponentModule {}
