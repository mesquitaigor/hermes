import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import HmsInputControll from './HmsInputControll';
import ToastController from '../../../controllers/toast/toast.controller';

@Component({
  selector: 'hms-input',
  templateUrl: 'hms-input.component.html',
  styleUrls: ['hms-input.component.scss'],
})
export default class HsmInputComponent implements AfterViewInit, OnInit {
  @Input() controll?: HmsInputControll;

  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef;
  inputControll?: FormControl;

  constructor(private readonly toastController: ToastController) {}

  ngOnInit(): void {
    this.alignErrorStyle();
    if (this.controll) {
      this.inputControll = this.controll.createNgControll();
      this.controll.setToastController(this.toastController);
    }
  }

  ngAfterViewInit(): void {
    const intervalRef = setInterval(() => {
      if (this.inputRef && this.inputControll) {
        this.controll?.defineInputProps({
          control: this.inputControll,
          elementRef: this.inputRef,
        });
        clearInterval(intervalRef);
      }
    }, 300);
  }

  alignErrorStyle(): void {
    if (this.controll) {
      if (this.controll.style.error == undefined) {
        this.controll.style.error = {};
        if (
          this.controll.style.error['text-align'] === undefined &&
          this.controll.style.input?.['text-align'] !== undefined
        ) {
          this.controll.style.error['text-align'] =
            this.controll.style.input['text-align'];
        }
      }
      if (this.controll.icon && this.controll.style.input) {
        this.controll.style.input['padding-left'] = '46px';
      }
    }
  }

  handleInputFocus(): void {
    this.controll?._focused_();
  }
  handleInputBlur(): void {
    this.controll?._blured_();
  }
}
