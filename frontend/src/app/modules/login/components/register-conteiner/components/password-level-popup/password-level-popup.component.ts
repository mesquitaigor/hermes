import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import PasswordPopupController from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordPopupController';
import RulesPopupInputData from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/RulesPopupInputData';
import { progressBarActionType } from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/types/progressBarActionType';

@Component({
  selector: 'password-level-popup-component',
  templateUrl: 'password-level-popup.component.html',
  styleUrls: ['password-level-popup.component.scss'],
})
export default class PasswordLevelPopupComponent implements OnInit {
  @Input() rules: RulesPopupInputData[] = [];
  @Input() @HostBinding('class.show') show = false;

  @Output() popupController = new EventEmitter<PasswordPopupController>();

  addingProgressBar = false;
  completedLevelProgressBar = 0;

  ngOnInit() {
    this.popupController.emit({
      changeProgressBar: (type: progressBarActionType) => {
        this.changeProgressPasswordBar(type);
      },
      getProgressBar: () => {
        return this.completedLevelProgressBar;
      },
    });
  }

  changeProgressPasswordBar(action: progressBarActionType) {
    if (
      !this.addingProgressBar &&
      ((action == 'remove' && this.completedLevelProgressBar > 0) ||
        (action == 'add' && this.completedLevelProgressBar < 5))
    ) {
      action == 'add'
        ? this.completedLevelProgressBar++
        : this.completedLevelProgressBar--;
      this.addingProgressBar = true;
      setTimeout(() => (this.addingProgressBar = false), 300);
    } else {
      setTimeout(() => this.changeProgressPasswordBar(action), 100);
    }
  }
}
