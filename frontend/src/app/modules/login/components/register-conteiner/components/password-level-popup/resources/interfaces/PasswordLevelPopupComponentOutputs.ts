import { EventEmitter } from '@angular/core';
import PasswordPopupController from './PasswordPopupController';

export default interface PasswordLevelPopupComponentOutputs {
  handlePopupController: EventEmitter<PasswordPopupController>;
}
