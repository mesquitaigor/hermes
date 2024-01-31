import { NgModule } from '@angular/core';
import PasswordLevelPopupComponent from './password-level-popup.component';
import { CommonModule } from '@angular/common';
import ProgressNivelBarComponentModule from './components/password-level-progress-bar/password-level-progress-bar.component.module';
import PasswordRequisiteItemComponentModule from './components/password-requisite-item/password-requisite-item.component.module';

@NgModule({
  declarations: [ PasswordLevelPopupComponent ],
  exports: [ PasswordLevelPopupComponent ],
  imports: [ CommonModule, ProgressNivelBarComponentModule, PasswordRequisiteItemComponentModule ]
})
export default class PasswordLevelPopupComponentModule{}
