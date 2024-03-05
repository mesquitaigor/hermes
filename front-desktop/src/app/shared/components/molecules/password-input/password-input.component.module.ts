import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import PasswordInputComponent from './password-input.component';
import PasswordLevelPopupComponentModule from './components/password-level-popup/password-level-popup.component.module';

@NgModule({
  declarations: [PasswordInputComponent],
  exports: [PasswordInputComponent],
  imports: [
    CommonModule,
    HsmInputComponentModule,
    PasswordLevelPopupComponentModule,
  ],
})
export default class PasswordInputComponentModule {}
