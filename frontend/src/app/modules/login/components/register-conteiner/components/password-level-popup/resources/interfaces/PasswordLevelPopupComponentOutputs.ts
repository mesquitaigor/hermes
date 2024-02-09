import { EventEmitter } from '@angular/core';
import PasswordPopupController from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordPopupController';

export default interface PasswordLevelPopupComponentOutputs {
  handlePopupController: EventEmitter<PasswordPopupController>;
}
