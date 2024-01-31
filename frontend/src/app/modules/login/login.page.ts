import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordValidaton from '../../shared/validators/PasswordValidation';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage{
  @HostBinding('class') content: 'initial' | 'register' = 'initial'

  registerForm: FormGroup = new FormGroup({

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



  handleDisplayRegisterContainer(){
    if(this.content == 'initial'){
      this.content = 'register'
    }
  }

  handleBackToInitialContent(){
    this.content ='initial'
  }


}
