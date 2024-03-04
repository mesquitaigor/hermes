import { Component } from '@angular/core';
import HmsInputControll from '../../../../shared/components/common/hms-input/resources/models/HmsInputControll';

@Component({
  selector: 'login-container',
  templateUrl: 'login-container.component.html',
  styleUrls: ['login-container.component.scss'],
})
export default class LoginContainerComponent {
  loginHmsControl?: HmsInputControll;

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    this.loginHmsControl = hmsControl;
  }

  handleBack(): void {
    //this.loginPageService.displayInitialContent();
  }
}
