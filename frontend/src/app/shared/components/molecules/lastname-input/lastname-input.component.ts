import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';

@Component({
  selector: 'lastname-input',
  templateUrl: 'lastname-input.component.html',
})
export default class LastNameInputComponent implements OnInit {
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  lastNameInput = new HmsInputControll({
    initialValue: '',
    autocapitalize: 'words',
    placeholder: 'Qual seu sobrenome?',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
    ],
    updateOn: 'submit',
    style: {
      input: {
        ['text-transform']: 'capitalize',
      },
    },
  });

  ngOnInit(): void {
    this.lastNameInput.recoverNgControl(() => {
      this.inputReady.emit(this.lastNameInput);
    });
  }
}
