import { Component, OnInit } from '@angular/core';
import LoginPageService from '../../resources/login.page.service';
import HmsInputControll from '../../../../shared/components/common/hms-input/resources/models/HmsInputControll';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';

@Component({
  selector: 'login-container',
  templateUrl: 'login-container.component.html',
  styleUrls: ['login-container.component.scss'],
})
export default class LoginContainerComponent implements OnInit {
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
}
