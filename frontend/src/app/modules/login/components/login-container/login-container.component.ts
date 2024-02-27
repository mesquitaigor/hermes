import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import LoginPageService from '../../resources/login.page.service';
import HmsInputControll from '../../../../shared/components/common/hms-input/resources/models/HmsInputControll';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';

@Component({
  selector: 'login-container',
  templateUrl: 'login-container.component.html',
  styleUrls: ['login-container.component.scss'],
})
export default class LoginContainerComponent implements OnInit {
  validatingEmail = false;
  loginHmsControl?: HmsInputControll;

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.loginPageService.$events.subscribe(() => {
      const inputEmailControl = this.loginPageService?.get(
        RegisterFormInputNames.EMAIL
      );
      if (inputEmailControl && this.loginHmsControl) {
        this.loginHmsControl.setValue(inputEmailControl.value as string);
      }
    });
  }

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    this.loginHmsControl = hmsControl;
  }

  handleBack(): void {
    this.loginPageService.displayInitialContent();
  }

  handleValidatingEmail(stt: boolean): void {
    this.validatingEmail = stt;
  }
}
