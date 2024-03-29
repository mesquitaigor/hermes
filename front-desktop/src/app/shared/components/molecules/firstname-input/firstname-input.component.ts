import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';

@Component({
  selector: 'firstname-input',
  templateUrl: 'firstname-input.component.html',
})
export default class FirstNameInputComponent implements OnInit {
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  firstNameInput = new HmsInputControll({
    initialValue: '',
    autocapitalize: 'words',
    placeholder: 'Como podemos te chamar?',
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
    this.firstNameInput.recoverNgControl(() => {
      this.inputReady.emit(this.firstNameInput);
    });
  }
}
