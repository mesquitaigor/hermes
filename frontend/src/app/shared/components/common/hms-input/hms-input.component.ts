import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'hms-input',
  templateUrl: 'hms-input.component.html',
  styleUrls: ['hms-input.component.scss'],
})
export default class HsmInputComponent implements OnInit{
  @Input() registerForm?: FormGroup
  @Input() errorsList: any
  @Input() placeholder?: string
  @Input() autofocus = false

  @Input() initialValue = ''
  @Input() formOptions?: FormControlOptions | ValidatorFn | ValidatorFn[] | null | undefined

  @Output() formControllOutput = new EventEmitter<FormControl>()

  inputControll?: FormControl

  ngOnInit(){
    if(this.formOptions){
      this.inputControll = new FormControl(this.initialValue, this.formOptions)
      this.formControllOutput.emit(this.inputControll)
    }
  }
}
