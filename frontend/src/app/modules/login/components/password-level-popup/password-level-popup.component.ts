import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'password-level-popup-component',
  templateUrl: 'password-level-popup.component.html',
  styleUrls: ['password-level-popup.component.scss'],
})
export default class PasswordLevelPopupComponent implements OnInit{
  @Input() rules:RulesPopupInputData[] = []
  @Input() nivelLabels:string[] = []
  @Input() @HostBinding('class.show') show = false

  @Output() popupController = new EventEmitter<PasswordPopupController>()

  addingProgressBar = false
  completedLevelProgressBar = 0

  ngOnInit(){
    this.popupController.emit({
      changeProgressBar: (type: progressBarActionType) => {
        this.changeProgressPasswordBar(type)
      },
      getProgressBar: () => {
        return this.completedLevelProgressBar
      }
    })
  }

  changeProgressPasswordBar(action: progressBarActionType){
    if(!this.addingProgressBar && ((action == 'remove' && this.completedLevelProgressBar > 0) || (action == 'add' && this.completedLevelProgressBar < 5))){
      action == 'add' ? this.completedLevelProgressBar++ : this.completedLevelProgressBar--
      this.addingProgressBar = true
      setTimeout(() => this.addingProgressBar = false, 300)
    }else{
      setTimeout(() => this.changeProgressPasswordBar(action), 100)
    }
  }
}

type progressBarActionType = 'add' | 'remove'
export interface PasswordPopupController{
  changeProgressBar: (type: progressBarActionType) => void,
  getProgressBar: () => number
}
export interface RulesPopupInputData{
  condition: () => boolean
  label: string
}
