import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import { IRulesLevelPopup } from './resources/IRulesLevelPopup';
import { RuleLevelPopup } from './resources/RuleLevelPopup';

@Component({
  selector: 'rules-level-popup',
  templateUrl: 'rules-level-popup.component.html',
  styleUrls: ['rules-level-popup.component.scss'],
})
export default class RulesLevelPopupComponent
  implements
    IPopupComponent.PopupChildComponent,
    OnInit,
    IRulesLevelPopup.Inputs,
    IRulesLevelPopup.Output
{
  @Input() popupController: RuleLevelPopup | undefined;
  @Input() @HostBinding('class.show') show = false;

  @Output() handlePopupController =
    new EventEmitter<IRulesLevelPopup.Controller>();

  addingProgressBar = false;
  completedLevelProgressBar = 0;

  popupDefinitions: IPopupComponent.PopupChildDefinitions = {
    style: {
      width: '225px',
      height: '200px',
    },
  };

  ngOnInit(): void {
    this.handlePopupController.emit({
      changeProgressBar: (type: IRulesLevelPopup.progressBarActionType) => {
        this.changeProgressPasswordBar(type);
      },
      getProgressBar: () => {
        return this.completedLevelProgressBar;
      },
    });

    this.listenPopupChanges()
  }

  listenPopupChanges(): void{
    if (this.popupController) {
      const onChangeSubscribe = this.popupController.onChanges();
      onChangeSubscribe?.subscribe(() => {
        this.popupController?.atualizeRulesStatus();
      });
    }
  }

  changeProgressPasswordBar(
    action: IRulesLevelPopup.progressBarActionType
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
