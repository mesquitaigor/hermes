import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';

@Component({
  selector: 'passwordconfirmation-input',
  templateUrl: 'passwordconfirmation-input.component.html',
})
export default class RegisterPasswordConfirmationInputComponent
  implements OnInit
{
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  lastNameInput = new HmsInputControll({
    initialValue: '',
    type: 'password',
    placeholder: 'Confirme sua senha',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
    ],
    updateOn: 'change',
  });

  ngOnInit(): void {
    this.lastNameInput.recoverNgControl(() => {
      this.inputReady.emit(this.lastNameInput);
    });
  }
}
