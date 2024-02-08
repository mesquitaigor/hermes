import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

export default interface HmsNgControlOutput {
  control: FormControl;
  elementRef: ElementRef;
}
