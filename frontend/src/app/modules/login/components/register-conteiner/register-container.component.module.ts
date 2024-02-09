import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import RegisterContainerComponent from './register-container.component';
import RegisterFirstNameInputComponentModule from 'src/app/modules/login/components/register-conteiner/components/register-firstname-input/register-firstname-input.component.module';
import RegisterLastNameInputComponentModule from 'src/app/modules/login/components/register-conteiner/components/register-lastname-input/register-lastname-input.component.module';
import RegisterPasswordInputComponentModule from 'src/app/modules/login/components/register-conteiner/components/register-password-input/register-password-input.component.module';
import RegisterPasswordConfirmationInputComponentModule from 'src/app/modules/login/components/register-conteiner/components/register-passwordconfirmation-input/register-passwordconfirmation-input.component.module';

@NgModule({
  declarations: [RegisterContainerComponent],
  exports: [RegisterContainerComponent],
  imports: [
    CommonModule,
    RegisterFirstNameInputComponentModule,
    RegisterLastNameInputComponentModule,
    RegisterPasswordInputComponentModule,
    RegisterPasswordConfirmationInputComponentModule,
  ],
})
export default class RegisterContainerComponentModule {}
