import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import HmsInputControll from 'src/app/shared/components/common/hms-input/resources/models/HmsInputControll';

@Component({
  selector: 'hms-input',
  templateUrl: 'hms-input.component.html',
  styleUrls: ['hms-input.component.scss'],
})
export default class HsmInputComponent implements AfterViewInit, OnInit {
  @Input() controll?: HmsInputControll;

  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef;
  inputControll?: FormControl;

  ngOnInit() {
    this.alignErrorStyle();
    if (this.controll) {
      this.inputControll = this.controll.createNgControll();
    }
  }

  alignErrorStyle() {
    if (this.controll && this.controll?.style?.error == undefined) {
      this.controll.style.error = {};
      if (
        this.controll?.style?.error?.['text-align'] === undefined &&
        this.controll?.style?.input?.['text-align'] !== undefined
      ) {
        this.controll.style.error['text-align'] =
          this.controll.style.input?.['text-align'];
      }
    }
  }

  ngAfterViewInit() {
    const intervalRef = setInterval(() => {
      if (this.inputRef && this.inputControll) {
        this.inputControll.value;
        this.controll?.defineInputProps({
          control: this.inputControll,
          elementRef: this.inputRef,
        });
        clearInterval(intervalRef);
      }
    }, 300);
  }

  handleInputFocus() {
    this.controll?._focused_();
  }
  handleInputBlur() {
    this.controll?._blured_();
  }
}
