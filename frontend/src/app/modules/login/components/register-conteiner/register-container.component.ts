import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControlOptions, FormControlStatus, Validators } from '@angular/forms';
import { PasswordPopupController } from './components/password-level-popup/password-level-popup.component';
import { skip, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import LoginPageService from '../../resources/login.page.service';
import PasswordLevelPopup from './resources/models/PasswordLevelPopup';
import PasswordValidaton from '../../../../shared/validators/PasswordValidation';
import UserService from '../../../../domains/users/user.service';

@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent implements OnInit{
  firstNameFormOptions: FormControlOptions = {
    validators: [Validators.required],
    updateOn: 'submit'
  }
  lastNameFormOptions: FormControlOptions = {
    validators: [Validators.required],
    updateOn: 'submit'
  }
  passwordFormOptions: FormControlOptions = {
    validators: [
      Validators.required,
      Validators.minLength(8),
      PasswordValidaton.shouldHaveNumbers,
      PasswordValidaton.shouldHaveLowerLetters,
      PasswordValidaton.shouldHaveUpperLetters,
      PasswordValidaton.shouldHavespecialCharacters
    ],
    updateOn: 'change'
  }
  passwordConfirmationFormOptions: FormControlOptions = {
    validators: [Validators.required],
    updateOn: 'change'
  }
  fistNameInputElement?: ElementRef

  passwordLevelPopup = new PasswordLevelPopup

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
    private userService: UserService,
    private loginPageService: LoginPageService
  ){}

  ngOnInit(){
    this.formRegisterListenChanges()
    this.atualizePasswordPopup()
    this.loginPageService.$events.subscribe((next) => {
      if( next?.to == 'register' ){
        this.fistNameInputElement?.nativeElement.focus()
      }
    })
  }

  handleGetFirstNameControl(controller: { control: AbstractControl, elementRef?: ElementRef }){
    this.loginPageService.addControl(RegisterFormInputNames.FIRST_NAME, controller.control)
    this.fistNameInputElement = controller.elementRef
  }

  handleGetLastNameControl(controller: { control: AbstractControl, elementRef?: ElementRef }){
    this.loginPageService.addControl(RegisterFormInputNames.LAST_NAME, controller.control)
  }

  handleGetPasswordControl(controller: { control: AbstractControl, elementRef?: ElementRef }){
    this.loginPageService.addControl(RegisterFormInputNames.PASSWORD, controller.control)
    this.passwordLevelPopup.setPasswordInput(controller.control)
  }

  handleGetPasswordConfirmationControl(controller: { control: AbstractControl, elementRef?: ElementRef }){
    this.loginPageService.addControl(RegisterFormInputNames.PASSWORD_CONFIRMATION, controller.control)
  }

  atualizeFormInputsStatus(status: FormControlStatus){
    if(status == 'VALID'){
      this.errors.passwordConfirmation.index = -1
      this.errors.firstName.index = -1
      this.errors.lastName.index = -1
    }else if(status == 'INVALID' && this.loginPageService.registerForm?.touched){
      this.changeInputStatus(RegisterFormInputNames.FIRST_NAME, ['required'])
      this.changeInputStatus(RegisterFormInputNames.LAST_NAME, ['required'])
      if(
        (!this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.errors?.['required'] && !this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.errors?.['required'])
          && this.loginPageService.registerForm?.errors?.['differentPasswords'] && this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.touched && this.loginPageService.get(RegisterFormInputNames.PASSWORD_CONFIRMATION)?.touched
        ) {
        this.errors.password.index = 1
      }else{
        this.changeInputStatus(RegisterFormInputNames.LAST_NAME, ['required', '', 'minLength', 'weakPassword'])
        this.changeInputStatus(RegisterFormInputNames.PASSWORD_CONFIRMATION, ['required'])
      }
    }
  }

  formRegisterListenChanges(){
    this.loginPageService.registerForm?.statusChanges.subscribe((status) => {
      this.atualizePasswordInputMessage(status)
      this.atualizeFormInputsStatus(status)
    })
  }

  changeInputStatus(inputName: RegisterFormInputNames, errorCases: string[]){
    const controll = this.loginPageService.get(inputName)
    if(controll?.status == 'VALID'){
      this.errors[inputName].index = -1
    }else if(controll?.status == 'INVALID' && this.loginPageService.registerForm?.touched){
      let found = false
      errorCases.forEach((errorCase, index) => {
        if(controll.errors?.[errorCase] && !found){
          found = true
          this.errors[inputName].index = index
        }
      })
    }
  }

  atualizePasswordInputMessage(status: FormControlStatus){
    const controll = this.loginPageService.get(RegisterFormInputNames.PASSWORD)
    if(controll?.status == 'VALID'){
      this.errors.password.index = -1
    }else if(status == 'INVALID' && this.loginPageService.registerForm?.touched){
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

  atualizePasswordPopup(){
    const passwordInput = this.loginPageService.get(RegisterFormInputNames.PASSWORD)
    if(passwordInput){
      passwordInput?.valueChanges.subscribe(() => {
        const errorPoints = this.getNumberPasswordError()
        const completedProgressBar = this.passwordLevelPopup.getProgressBar()
        if(typeof completedProgressBar == 'number'){
          if(errorPoints > completedProgressBar){
            this.passwordLevelPopup.changeProgress('add')
          }else if(errorPoints < completedProgressBar){
            this.passwordLevelPopup.changeProgress('remove')
          }
          if(completedProgressBar == 5){
            setTimeout(() => this.handleHiddenPopup(), 500)
          }
        }
      })
    }
  }

  getNumberPasswordError(){
    let errorPoints = 5;
    const passwordInput = this.loginPageService.get(RegisterFormInputNames.PASSWORD)
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
    return errorPoints
  }

  handleSendRegister(){
    const registerForm = this.loginPageService.registerForm
    if(registerForm){
      registerForm.statusChanges
        .pipe(skip(1), take(1))
        .subscribe(() => {
          if(registerForm?.valid){
            this.userService.createUser(this.getUserFromForm())
              .subscribe(() => {

              })
          }
        })
      registerForm.markAllAsTouched()
      registerForm.updateValueAndValidity()
    }
  }

  getUserFromForm(){
    return {
      email: this.loginPageService.get(RegisterFormInputNames.EMAIL)?.value,
      firstName: this.loginPageService.get(RegisterFormInputNames.FIRST_NAME)?.value,
      lastName: this.loginPageService.get(RegisterFormInputNames.LAST_NAME)?.value,
      password: this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.value
    }
  }

  handleShowPopup(){
    this.passwordLevelPopup.show = true
  }

  handleHiddenPopup(){
    this.passwordLevelPopup.show = false
  }

  handleGetPasswordPopupController(controller: PasswordPopupController){
    this.passwordLevelPopup.setPopupController(controller)
  }

  handleBack(){
    this.loginPageService.displayInitialContent()
  }
}
