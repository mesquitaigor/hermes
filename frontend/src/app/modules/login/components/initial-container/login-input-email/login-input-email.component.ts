import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControlOptions, FormControlStatus, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import LoginPageService from '../../../resources/login.page.service';
import { RegisterFormInputNames } from '../../../resources/enums/RegisterFormInputNames';
import EmailValidator from '../../../../../shared/validators/EmailValidator';

@Component({
  selector: 'login-input-email',
  templateUrl: 'login-input-email.component.html',
  styleUrls: ['login-input-email.component.scss'],
})
export default class LoginInputEmailComponent{

  @Output() validatingEmail = new EventEmitter<boolean>()

  emailInputStyle = {input: {['text-align']: 'center'}}
  emailFormControll: FormControlOptions = {
    validators: [
      Validators.required,
      EmailValidator.format,
    ],
    asyncValidators: [
      EmailValidator.existing(this.httpClient)
    ],
    updateOn: 'submit'
  }
  errors = {
    index: -1,
    messages: [
      'Digite seu email para podermos começar.',
      'Email inválido.',
      'Email já possui cadastrado.'
    ]
  }

  constructor(
    private httpClient: HttpClient,
    private loginPageService: LoginPageService
  ){}

  handleGetEmailFormControl(emailInputController: { control: AbstractControl, elementRef?: ElementRef }){
    if(this.loginPageService.registerForm){
      setTimeout(() => {
        emailInputController.elementRef?.nativeElement.focus()
      }, 300)
      this.loginPageService.addControl(RegisterFormInputNames.EMAIL, emailInputController.control)
      this.listenEmailStatusChanges()
    }
  }

  listenEmailStatusChanges(){
    const emailControll = this.loginPageService.get(RegisterFormInputNames.EMAIL)
    emailControll?.statusChanges.subscribe((status) => {
      this.atualizeEmailErrorMessage(status)
    })
  }

  atualizeEmailErrorMessage(status: FormControlStatus){
    const emailControll = this.loginPageService.get(RegisterFormInputNames.EMAIL)
    if(emailControll){
      this.validatingEmail.emit(status === 'PENDING')
      if(status == 'VALID' || status == 'PENDING'){
        this.errors.index = -1
      }else if(status == 'INVALID' && emailControll?.touched){
        if(emailControll?.errors?.['required']){
          this.errors.index = 0
        }else if(emailControll?.errors?.['invalidFormat']){
          this.errors.index = 1
        }else if(emailControll?.errors?.['existing']){
          this.errors.index = 2
        }
      }
    }
  }


}
