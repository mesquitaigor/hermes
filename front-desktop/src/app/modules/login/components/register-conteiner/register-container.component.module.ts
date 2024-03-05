import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import RegisterContainerComponent from './register-container.component';
import ContentTitleComponentModule from '@molecules/content-title/content-title.component.module';
import PasswordInputComponentModule from '../../../../shared/components/molecules/password-input/password-input.component.module';
import FirstNameInputComponentModule from '../../../../shared/components/molecules/firstname-input/firstname-input.component.module';
import LastNameInputComponentModule from '../../../../shared/components/molecules/lastname-input/lastname-input.component.module';
import PasswordConfirmationInputComponentModule from '../../../../shared/components/molecules/passwordconfirmation-input/passwordconfirmation-input.component.module';

@NgModule({
  declarations: [RegisterContainerComponent],
  exports: [RegisterContainerComponent],
  imports: [
    CommonModule,
    FirstNameInputComponentModule,
    LastNameInputComponentModule,
    PasswordInputComponentModule,
    PasswordConfirmationInputComponentModule,
    ContentTitleComponentModule,
  ],
})
export default class RegisterContainerComponentModule {}
