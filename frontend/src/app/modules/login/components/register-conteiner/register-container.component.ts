import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControlOptions, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { PasswordPopupController, RulesPopupInputData } from '../password-level-popup/password-level-popup.component';
import { skip, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

enum RegisterFormInputNames{
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PASSWORD = 'password',
  PASSWORD_CONFIRMATION = 'passwordConfirmation',
  EMAIL = 'email'
}
@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent implements OnInit{
  @Input () registerForm?: FormGroup
  @Output() back = new EventEmitter<void>()

  firstNameFormOptions: FormControlOptions = {
    validators: [Validators.required],
    updateOn: 'submit'
  }

  passwordLevelPopup: {controller?: PasswordPopupController, show: boolean, nivelLabels: string[], rules: RulesPopupInputData[]} = {
    show: false,
    nivelLabels: [
      'Nível da sua senha',
      'Tá fraca ainda.',
      'Começou a melhorar.',
      'Tá indo...',
      'Tá ficando boa em!',
      'Agora sim!',
    ],
    rules: [
      {
        label: 'Possui letras maiusculas',
        condition: () => !this.registerForm?.get('password')?.errors?.['shouldHaveUpperLetters'] && !this.registerForm?.get('password')?.pristine
      },
      {
        label: 'Possui letras mínusculas',
        condition: () => !this.registerForm?.get('password')?.errors?.['shouldHaveLowerLetters'] && !this.registerForm?.get('password')?.pristine
      },
      {
        label: 'Possui números',
        condition: () => !this.registerForm?.get('password')?.errors?.['shouldHaveNumbers'] && !this.registerForm?.get('password')?.pristine
      },
      {
        label: 'Possui carácteres expeciais',
        condition: () => !this.registerForm?.get('password')?.errors?.['shouldHavespecialCharacters'] && !this.registerForm?.get('password')?.pristine
      },
      {
        label: 'Possui mais de 8 dígitos',
        condition: () => !this.registerForm?.get('password')?.errors?.['minlength'] && !this.registerForm?.get('password')?.pristine
      }
    ]
  }

  errors: {[key in RegisterFormInputNames]?: any} = {
    firstName: {
      index: -1,
      messages: ['Campo obrigatório.']
    },
    lastName: {
      index: -1,
      messages: ['Campo obrigatório.']
    },
    password: {
      index: -1,
      messages: ['Campo obrigatório.', 'As senhas precisam ser iguais.', 'Senha muito curta.', 'Senha fraca.']
    },
    passwordConfirmation: {
      index: -1,
      messages: ['Campo obrigatório.']
    },
  }

  constructor(
    private httpClient: HttpClient
  ){}

  ngOnInit(){
    this.formRegisterListenChanges()
    this.atualizePasswordPopup()
  }

  handleGetFirstNameFormControl(formControl: AbstractControl){
    if(this.registerForm){
      this.registerForm.addControl(RegisterFormInputNames.FIRST_NAME, formControl)
    }
  }

  atualizeFormInputsStatus(status: FormControlStatus){
    if(this.registerForm){
      if(status == 'VALID'){
        this.errors.passwordConfirmation.index = -1
        this.errors.firstName.index = -1
        this.errors.lastName.index = -1
      }else if(status == 'INVALID' && this.registerForm.touched){
        this.changeInputStatus(RegisterFormInputNames.FIRST_NAME, ['required'])
        this.changeInputStatus(RegisterFormInputNames.LAST_NAME, ['required'])
        if(
          (!this.registerForm.get(RegisterFormInputNames.PASSWORD)?.errors?.['required'] && !this.registerForm.get(RegisterFormInputNames.PASSWORD)?.errors?.['required'])
            && this.registerForm.errors?.['differentPasswords'] && this.registerForm.get(RegisterFormInputNames.PASSWORD)?.touched && this.registerForm.get(RegisterFormInputNames.PASSWORD_CONFIRMATION)?.touched
          ) {
          this.errors.password.index = 1
        }else{
          this.changeInputStatus(RegisterFormInputNames.LAST_NAME, ['required', '', 'minLength', 'weakPassword'])
          this.changeInputStatus(RegisterFormInputNames.PASSWORD_CONFIRMATION, ['required'])
        }
      }
    }
  }

  formRegisterListenChanges(){
    if(this.registerForm){
      this.registerForm.statusChanges.subscribe((status) => {
        this.atualizePasswordInputMessage(status)
        this.atualizeFormInputsStatus(status)
      })
    }
  }

  changeInputStatus(inputName: RegisterFormInputNames, errorCases: string[]){
    if(this.registerForm){
      const controll = this.registerForm.get(inputName)
      if(controll?.status == 'VALID'){
        this.errors[inputName].index = -1
      }else if(controll?.status == 'INVALID' && this.registerForm.touched){
        let found = false
        errorCases.forEach((errorCase, index) => {
          if(controll.errors?.[errorCase] && !found){
            found = true
            this.errors[inputName].index = index
          }
        })
      }
    }
  }

  atualizePasswordInputMessage(status: FormControlStatus){
    if(this.registerForm){
      const controll = this.registerForm.get('password')
      if(controll?.status == 'VALID'){
        this.errors.password.index = -1
      }else if(status == 'INVALID' && this.registerForm.touched){
        if(controll?.errors?.['required']){
          this.errors.password.index = 0
        }else if(
          controll?.errors?.['minLength'] ||
          controll?.errors?.['shouldHaveNumbers'] ||
          controll?.errors?.['shouldHaveLowerLetters'] ||
          controll?.errors?.['shouldHaveUpperLetters'] ||
          controll?.errors?.['shouldHavespecialCharacters']
        ){
          this.errors.password.index = 3
        }else{
          this.errors.password.index = -1
        }
      }
    }
  }

  atualizePasswordPopup(){
    if(this.registerForm){
      const passwordInput = this.registerForm.get('password')
      if(passwordInput){
        passwordInput?.valueChanges.subscribe(() => {
          const errorPoints = this.getNumberPasswordError()
          const completedProgressBar = this.passwordLevelPopup.controller?.getProgressBar()
          if(typeof completedProgressBar == 'number'){
            if(errorPoints > completedProgressBar){
              this.passwordLevelPopup.controller?.changeProgressBar('add')
            }else if(errorPoints < completedProgressBar){
              this.passwordLevelPopup.controller?.changeProgressBar('remove')
            }
            if(completedProgressBar == 5){
              setTimeout(() => this.handleHiddenPopup(), 500)
            }
          }
        })
      }
    }
  }

  getNumberPasswordError(){
    let errorPoints = 5;
    if(this.registerForm){
      const passwordInput = this.registerForm.get(RegisterFormInputNames.PASSWORD)
      if(passwordInput){
        ['minlength', 'shouldHaveNumbers',
        'shouldHaveLowerLetters',
        'shouldHaveUpperLetters',
        'shouldHavespecialCharacters'].forEach((errorName) => {
          if(passwordInput.errors?.[errorName]){
            errorPoints--
          }
        })
      }
    }
    return errorPoints
  }

  handleSendRegister(){
    if(this.registerForm){
      this.registerForm.statusChanges
      .pipe(skip(1), take(1))
      .subscribe(() => {
        if(this.registerForm?.valid){
          this.httpClient.post('http://localhost:3500/users', {
            email: this.registerForm.get(RegisterFormInputNames.EMAIL)?.value,
            firstName: this.registerForm.get(RegisterFormInputNames.FIRST_NAME)?.value,
            lastName: this.registerForm.get(RegisterFormInputNames.LAST_NAME)?.value,
            password: this.registerForm.get(RegisterFormInputNames.PASSWORD)?.value
          }).subscribe(() => {})
        }
      })
    this.registerForm.markAllAsTouched()
    this.registerForm.updateValueAndValidity()
    }
  }

  handleShowPopup(){
    this.passwordLevelPopup.show = true
  }

  handleHiddenPopup(){
    this.passwordLevelPopup.show = false
  }

  handleGetPasswordPopupController(controller: PasswordPopupController){
    this.passwordLevelPopup.controller = controller
  }

  handleBack(){
    this.back.emit()
  }
}
