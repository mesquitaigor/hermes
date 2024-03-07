import { FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';

export namespace IRegisterContainer {
  export type inputsControl = {
    [key in FormInputNames]?: InputsControlValue;
  };
  export interface OutReady {
    addControls: (formGroup: FormGroup) => void;
    removeControls: (formGroup: FormGroup) => void;
  }
  export interface InputsControlValue {
    control: HmsInputControll;
    name: FormInputNames;
  }
  export enum FormInputNames {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PASSWORD = 'password',
    PASSWORD_CONFIRMATION = 'passwordConfirmation',
    EMAIL = 'email',
  }
}
