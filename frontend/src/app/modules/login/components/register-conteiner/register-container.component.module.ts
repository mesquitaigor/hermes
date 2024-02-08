import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import RegisterContainerComponent from './register-container.component';
import RegisterFirstNameInputComponentModule from 'src/app/modules/login/components/register-conteiner/components/register-firstname-input/register-firstname-input.component.module';
import RegisterLastNameInputComponentModule from 'src/app/modules/login/components/register-conteiner/components/register-lastname-input/register-lastname-input.component.module';

@NgModule({
  declarations: [RegisterContainerComponent],
  exports: [RegisterContainerComponent],
  imports: [
    CommonModule,
    RegisterFirstNameInputComponentModule,
    RegisterLastNameInputComponentModule,
  ],
})
export default class RegisterContainerComponentModule {}
