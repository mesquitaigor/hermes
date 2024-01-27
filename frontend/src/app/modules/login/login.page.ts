import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { skip, take } from 'rxjs';
import EmailValidator from '../../shared/validators/EmailValidator';
import PasswordValidaton from '../../shared/validators/PasswordValidation';

type registerFormInputNames = 'email' | 'firstName' | 'lastName' | 'password' | 'passwordConfirmation'

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{
  @HostBinding('class') content: 'initial' | 'register' = 'initial'
  validatingEmail = false
  showPasswordPopup = false
  errors = {
    email: {
      index: -1,
      messages: [
        'Digite seu email para podermos começar.',
        'Email inválido.',
        'Email já possui cadastrado.'
      ]
    },
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
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('sdafadsf@adsfasf.com', {
      validators: [
        Validators.required,
        EmailValidator.format,
      ],
      asyncValidators: [
        EmailValidator.existing(this.httpClient)
      ],
      updateOn: 'submit'
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit'
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit'
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        PasswordValidaton.shouldHaveNumbers,
        PasswordValidaton.shouldHaveLowerLetters,
        PasswordValidaton.shouldHaveUpperLetters,
        PasswordValidaton.shouldHavespecialCharacters
      ],
      updateOn: 'change'
    }),
    passwordConfirmation: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change'
    })
  }, {
    updateOn: 'submit',
    validators: [
      PasswordValidaton.passwordConfirmationIsEqual
    ]
  })
  constructor(
    private httpClient: HttpClient
  ){}

  ngOnInit(){
    const emailControll = this.registerForm.get('email')
    emailControll?.statusChanges.subscribe((status) => {
      this.validatingEmail = status === 'PENDING'
      if(status == 'VALID' || status == 'PENDING'){
        this.errors.email.index = -1
      }else if(status == 'INVALID' && emailControll.touched){
        if(emailControll?.errors?.['required']){
          this.errors.email.index = 0
        }else if(emailControll?.errors?.['invalidFormat']){
          this.errors.email.index = 1
        }else if(emailControll?.errors?.['existing']){
          this.errors.email.index = 2
        }
      }
    })

    this.registerForm.statusChanges.subscribe((status) => {
      const controll = this.registerForm.get('password')
      if(controll?.status == 'VALID'){
        this.errors.password.index = -1
      }else if(status == 'INVALID' && this.registerForm.touched){
        if(this.registerForm.get('password')?.errors?.['required']){
          this.errors.password.index = 0
        }
        if(this.registerForm.get('password')?.errors?.['shortPassword']){
          this.errors.password.index = 2
        }
        if(this.registerForm.get('password')?.errors?.['weakPassword']){
          this.errors.password.index = 3
        }
      }
      if(status == 'VALID'){
        this.errors.passwordConfirmation.index = -1
        this.errors.firstName.index = -1
        this.errors.lastName.index = -1
      }else if(status == 'INVALID' && this.registerForm.touched){
        this.changeInputStatus('firstName', ['required'])
        this.changeInputStatus('lastName', ['required'])
        if(
          (!this.registerForm.get('password')?.errors?.['required'] && !this.registerForm.get('password')?.errors?.['required'])
           && this.registerForm.errors?.['differentPasswords'] && this.registerForm.get('password')?.touched
          ) {
          this.errors.password.index = 1
        }else{
          this.changeInputStatus('password', ['required', '', 'shortPassword', 'weakPassword'])
          this.changeInputStatus('passwordConfirmation', ['required'])
        }

      }
    })
    const passwordInput = this.registerForm.get('password')
    passwordInput?.valueChanges.subscribe(() => {
      let errorPoints = 5;
      ['minlength', 'shouldHaveNumbers',
      'shouldHaveLowerLetters',
      'shouldHaveUpperLetters',
      'shouldHavespecialCharacters'].forEach((errorName) => {
        if(passwordInput.errors?.[errorName]){
          errorPoints--
        }
      })

      if(errorPoints > this.completedProgressBar){
        this.changeProgressPasswordBar('add')
      }else if(errorPoints < this.completedProgressBar){
        this.changeProgressPasswordBar('remove')
      }
      if(this.completedProgressBar == 5){
        setTimeout(() => this.handleHiddenPopup(), 500)
      }
    })
  }

  addingProgressBar = false
  completedProgressBar = 0

  changeProgressPasswordBar(action: 'add' | 'remove'){
    if(!this.addingProgressBar && ((action == 'remove' && this.completedProgressBar > 0) || (action == 'add' && this.completedProgressBar < 5))){
      action == 'add' ? this.completedProgressBar++ : this.completedProgressBar--
      this.addingProgressBar = true
      setTimeout(() => this.addingProgressBar = false, 300)
    }else{
      setTimeout(() => this.changeProgressPasswordBar(action), 100)
    }
  }

  handleShowPopup(){
    this.showPasswordPopup = true
  }
  handleHiddenPopup(){
    this.showPasswordPopup = false
  }

  changeInputStatus(inputName: registerFormInputNames, errorCases: string[]){
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

  handleShowRegisterContent(){
    const emailFormControll = this.registerForm.get('email')
    if(emailFormControll){
      emailFormControll.statusChanges
        .pipe(skip(1))
        .subscribe((status: FormControlStatus) => {
          if(status == 'VALID' && emailFormControll.valid && this.content === 'initial'){
            this.content = 'register'
          }
        })
      emailFormControll.markAsTouched()
      emailFormControll.updateValueAndValidity();
    }
  }
  handleBackToInitialContent(){
    //this.registerForm.reset()
    this.content ='initial'
  }

  handleSendRegister(){
    this.registerForm.statusChanges
      .pipe(skip(1), take(1))
      .subscribe(() => {
        if(this.registerForm.valid){
          this.httpClient.post('http://localhost:3500/users', {
            email: this.registerForm.get('email')?.value,
            firstName: this.registerForm.get('firstName')?.value,
            lastName: this.registerForm.get('lastName')?.value,
            password: this.registerForm.get('password')?.value
          }).subscribe(() => {})
        }
      })
    this.registerForm.markAllAsTouched()
    this.registerForm.updateValueAndValidity()
  }
}
