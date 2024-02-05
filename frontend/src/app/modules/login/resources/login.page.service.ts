import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { loginContentNames } from './types/loginContentNames';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RegisterFormInputNames } from './enums/RegisterFormInputNames';

@Injectable({
  providedIn: 'root'
})
export default class LoginPageService{
  registerForm?: FormGroup
  $events = new BehaviorSubject<{ to: loginContentNames } | null>(null)

  setRegisterForm(formGroup: FormGroup){
    this.registerForm = formGroup
  }

  addControl(name: RegisterFormInputNames, control: AbstractControl){
    this.registerForm?.addControl(name, control)
  }

  get(name: RegisterFormInputNames): AbstractControl<any, any> | null | undefined{
    return this.registerForm?.get(name)
  }

  displayRegisterContent(): void{
    this.$events.next({ to: 'register' })
  }
  displayInitialContent(): void{
    this.$events.next({ to: 'initial' })
  }
}
