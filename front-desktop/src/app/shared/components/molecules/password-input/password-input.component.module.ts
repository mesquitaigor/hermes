import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import PasswordInputComponent from './password-input.component';
import RulesLevelPopupComponentModule from '../password-level-popup/rules-level-popup.component.module';

@NgModule({
  declarations: [PasswordInputComponent],
  exports: [PasswordInputComponent],
  imports: [
    CommonModule,
    HsmInputComponentModule,
    RulesLevelPopupComponentModule,
  ],
})
export default class PasswordInputComponentModule {}
