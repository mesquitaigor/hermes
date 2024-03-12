import { EventEmitter } from '@angular/core';
import { RuleLevelPopup } from './RuleLevelPopup';

export namespace IRulesLevelPopup {
  export type progressBarActionType = 'add' | 'remove';
  export interface Inputs {
    popupController: RuleLevelPopup | undefined;
    show: boolean;
  }
  export interface Controller {
    changeProgressBar: (type: progressBarActionType) => void;
    getProgressBar: () => number;
  }
  export interface Output {
    handlePopupController: EventEmitter<Controller>;
  }
  export interface IRules {
    condition: () => boolean;
    levelText: string;
    label: string;
    ruleApplied?: boolean;
  }
}
