import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { loginContentNames } from './types/loginContentNames';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RegisterFormInputNames } from './enums/RegisterFormInputNames';

@Injectable({
  providedIn: 'root',
})
export default class LoginPageService {
  registerForm?: FormGroup;
  $events = new BehaviorSubject<{
    to: loginContentNames;
    previus: loginContentNames | undefined;
  } | null>(null);

  setRegisterForm(formGroup: FormGroup): void {
    this.registerForm = formGroup;
  }

  addControl(name: RegisterFormInputNames, control: AbstractControl): void {
    this.registerForm?.addControl(name, control);
  }

  get(
    name: RegisterFormInputNames
  ): AbstractControl<unknown, unknown> | null | undefined {
    return this.registerForm?.get(name);
  }

  displayRegisterContent(): void {
    this.$events.next({ to: 'register', previus: this.$events.value?.to });
  }
  displayLoginContent(): void {
    this.$events.next({ to: 'login', previus: this.$events.value?.to });
  }
  displayInitialContent(): void {
    this.$events.next({ to: 'initial', previus: this.$events.value?.to });
  }
}
