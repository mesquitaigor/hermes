import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import EmailValidator from '@validators/email-validator/EmailValidator';
import { IEmailValidator } from '@validators/email-validator/IEmailValidator';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';

@Component({
  selector: 'email-input',
  templateUrl: 'email-input.component.html',
})
export default class EmailInputComponent implements OnInit {
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  emailFormControll = new HmsInputControll({
    initialValue: '',
    type: 'email',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Digite seu email para podermos começar.',
      },
      {
        fn: EmailValidator.format,
        key: IEmailValidator.errorKeys.invalidFormat,
        message: 'Email inválido.',
      },
    ],
    updateOn: 'submit',
    placeholder: 'Digite seu melhor email',
    style: {
      input: {
        ['text-align']: 'center',
      },
    },
  });

  ngOnInit(): void {
    this.emailFormControll.recoverNgControl(() => {
      this.inputReady.emit(this.emailFormControll);
    });
  }
}
