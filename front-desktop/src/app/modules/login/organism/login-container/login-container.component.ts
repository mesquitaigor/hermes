import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';
import { ILoginPage } from '../../resources/ILoginPage';
import { BehaviorSubject } from 'rxjs';
import AuthService from '../../../../shared/auth/auth.service';

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
    private authService: AuthService
  ){}

  handleLogin(): void{
    const loginData = this.contFormGroup?.value
    this.authService.login(loginData.email, loginData.password);
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
