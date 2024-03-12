import { FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';
import { ILoginPage } from '../../resources/ILoginPage';

export namespace IRegisterContainer {
  export type inputsControl = {
    [key in ILoginPage.InputNames]?: InputsControlValue;
  };
  export interface OutReady {
    addControls: (formGroup: FormGroup) => void;
    removeControls: (formGroup: FormGroup) => void;
  }
  export interface InputsControlValue {
    control: HmsInputControll;
    name: ILoginPage.InputNames;
  }
}
