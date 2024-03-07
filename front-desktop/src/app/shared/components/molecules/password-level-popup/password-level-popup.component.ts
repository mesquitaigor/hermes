import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import { IPasswordLevelPopup } from './IPasswordLevelPopup';

@Component({
  selector: 'password-level-popup-component',
  templateUrl: 'password-level-popup.component.html',
  styleUrls: ['password-level-popup.component.scss'],
})
export default class PasswordLevelPopupComponent
  implements
    IPopupComponent.PopupChildComponent,
    OnInit,
    IPasswordLevelPopup.Inputs,
    IPasswordLevelPopup.Output
{
  @Input() popupController: IPasswordLevelPopup.PasswordLevelPopup | undefined;
  @Input() @HostBinding('class.show') show = false;

  @Output() handlePopupController =
    new EventEmitter<IPasswordLevelPopup.Controller>();

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
      changeProgressBar: (type: IPasswordLevelPopup.progressBarActionType) => {
        this.changeProgressPasswordBar(type);
      },
      getProgressBar: () => {
        return this.completedLevelProgressBar;
      },
    });

    this.listenPopupChanges()
  }

  listenPopupChanges(){
    if (this.popupController) {
      const onChangeSubscribe = this.popupController.onChanges();
      onChangeSubscribe?.subscribe(() => {
        this.popupController?.atualizeRulesStatus();
      });
    }
  }

  changeProgressPasswordBar(
    action: IPasswordLevelPopup.progressBarActionType
  ): void {
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
