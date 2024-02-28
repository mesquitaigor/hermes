import { FormGroup } from '@angular/forms';

export default interface OutRegisterContainerReady {
  addControls: (formGroup: FormGroup) => void;
  removeControls: (formGroup: FormGroup) => void;
}
