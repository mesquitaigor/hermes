import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';
import { ILoginPage } from '../../resources/ILoginPage';
import { BehaviorSubject, finalize } from 'rxjs';
import AuthService from '../../../../shared/auth/auth.service';
import ToastController from '../../../../shared/controllers/toast/toast.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'login-container',
  templateUrl: 'login-container.component.html',
  styleUrls: ['login-container.component.scss'],
})
export default class LoginContainerComponent {
  @Input() contentObservable?: BehaviorSubject<ILoginPage.LoginPageEvents>;
  @Input({required: true}) contFormGroup?: FormGroup;
  loginHmsControl?: HmsInputControll;
  sending = false

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ){}

  handleLogin(): void{
    if(this.contFormGroup){
      this.contFormGroup.removeControl(ILoginPage.InputNames.FIRST_NAME);
      this.contFormGroup.removeControl(ILoginPage.InputNames.LAST_NAME);
      const subscription = this.contFormGroup.statusChanges.subscribe(() => {
        if (this.contFormGroup?.valid && !this.sending) {
          this.sending = true
          const loginData = this.contFormGroup.value
          if (loginData) {
            this.authService.login(loginData.email, loginData.password)
              .pipe(
                finalize(() => {
                  subscription.unsubscribe();
                  this.sending = false;
                })
              )
              .subscribe({
                next: () => {
                  this.toastController.success('Usuário autenticado com sucesso.');
                  this.router.navigate(['/home']);
                },
                error: () => {
                  this.toastController.error(
                    'Erro ao tentar realizar a autenticação.'
                  );
                },
              });
          } else {
            subscription.unsubscribe();
            this.sending = false;
          }
        } else {
          subscription.unsubscribe();
        }
      });
      this.updateInput(
        ILoginPage.InputNames.EMAIL,
        this.contFormGroup
      );
      this.updateInput(
        ILoginPage.InputNames.PASSWORD,
        this.contFormGroup
      );
      this.contFormGroup.markAllAsTouched();
      this.contFormGroup.updateValueAndValidity();
    }
  }

  

  updateInput(
    inputName: ILoginPage.InputNames,
    registerForm: FormGroup
  ): void {
    registerForm.get(inputName)?.markAsTouched();
    registerForm.get(inputName)?.updateValueAndValidity();
  }

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    if(hmsControl.style.input){
      hmsControl.style.input['text-align'] = 'left';
    }
    this.loginHmsControl = hmsControl;
    this.loginHmsControl.setValue(this.contFormGroup?.get(ILoginPage.InputNames.EMAIL)?.value)
  }

  handleRecoverPasswordInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.removeControl(
        ILoginPage.InputNames.PASSWORD,
      );
      this.contFormGroup.addControl(
        ILoginPage.InputNames.PASSWORD,
        abstractControl
      );
    }
  }
  handleBack(): void{
    this.contentObservable?.next({ displayContent: 'initial' });
  }
}
