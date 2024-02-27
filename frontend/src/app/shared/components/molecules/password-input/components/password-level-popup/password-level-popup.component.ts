import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import PasswordLevelPopup from './resources/models/PasswordLevelPopup';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import PasswordLevelPopupComponentInputs from './resources/interfaces/PasswordLevelPopupComponentInputs';
import PasswordLevelPopupComponentOutputs from './resources/interfaces/PasswordLevelPopupComponentOutputs';
import PasswordPopupController from './resources/interfaces/PasswordPopupController';
import { progressBarActionType } from './resources/types/progressBarActionType';

@Component({
  selector: 'password-level-popup-component',
  templateUrl: 'password-level-popup.component.html',
  styleUrls: ['password-level-popup.component.scss'],
})
export default class PasswordLevelPopupComponent
  implements
    IPopupComponent.PopupChildComponent,
    OnInit,
    PasswordLevelPopupComponentInputs,
    PasswordLevelPopupComponentOutputs
{
  @Input() popupController: PasswordLevelPopup | undefined;
  @Input() @HostBinding('class.show') show = false;

  @Output() handlePopupController = new EventEmitter<PasswordPopupController>();

  addingProgressBar = false;
  completedLevelProgressBar = 0;

  popupDefinitions: IPopupComponent.PopupChildDefinitions = {
    show: false,
    style: {
      width: '225px',
      height: '200px',
    },
  };

  ngOnInit(): void {
    this.handlePopupController.emit({
      changeProgressBar: (type: progressBarActionType) => {
        this.changeProgressPasswordBar(type);
      },
      getProgressBar: () => {
        return this.completedLevelProgressBar;
      },
    });

    if (this.popupController) {
      const onChangeSubscribe = this.popupController.onChanges();
      onChangeSubscribe?.subscribe(() => {
        this.popupController?.rules.forEach((rule) => {
          rule.ruleApplied = rule.condition();
        });
      });
    }
  }

  changeProgressPasswordBar(action: progressBarActionType): void {
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
