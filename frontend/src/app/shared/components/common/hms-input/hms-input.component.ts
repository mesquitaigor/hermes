import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormControlOptions, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'hms-input',
  templateUrl: 'hms-input.component.html',
  styleUrls: ['hms-input.component.scss'],
})
export default class HsmInputComponent implements AfterViewInit, OnInit{
  @Input() registerForm?: FormGroup
  @Input() errorsList: any
  @Input() placeholder?: string
  @Input() inputAutofocus = false
  @Input() initialValue = ''
  @Input() formOptions?: FormControlOptions | ValidatorFn | ValidatorFn[] | null | undefined
  @Input() style: { input: { ['text-align']: string }, error?: { ['text-align']: string } } = {
    input: {
      'text-align': 'left'
    },
  }

  @Output() formControllOutput = new EventEmitter<{ control: AbstractControl, elementRef?: ElementRef }>()
  @Output() inputFocus = new EventEmitter()
  @Output() inputBlur = new EventEmitter()

  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef
  inputControll?: FormControl

  ngOnInit(){
    if(this.style?.error?.['text-align'] === undefined){
      this.style.error = this.style.input
    }
  }

  ngAfterViewInit(){
    if(this.formOptions){
      this.inputControll = new FormControl(this.initialValue, this.formOptions)
    }
    const intervalRef = setInterval(() => {
      if(this.inputRef && this.inputControll){
        this.inputControll.value
        this.formControllOutput.emit({ control: this.inputControll, elementRef: this.inputRef })
        clearInterval(intervalRef)
      }
    }, 100)
  }

  handleInputFocus(){
    this.inputFocus.emit()
  }
  handleInputBlur(){
    this.inputBlur.emit()
  }

}
