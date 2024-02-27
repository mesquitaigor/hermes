import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControlStatus, Validators } from '@angular/forms';
import EmailValidator from '@validators/email-validator/EmailValidator';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import { EmailErrorsKeys } from '@validators/email-validator/EmailErrorsKeys';

@Component({
  selector: 'email-input',
  templateUrl: 'email-input.component.html',
})
export default class EmailInputComponent implements OnInit {
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  @Output() validating = new EventEmitter<boolean>();
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
        key: EmailErrorsKeys.invalidFormat,
        message: 'Email inválido.',
      },
    ],
    /* asyncValidators: [
      {
        fn: EmailValidator.existing(this.userService),
        key: emailErrors.existing,
        message: 'Email já possui cadastrado.',
      },
    ], */
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
      this.recoverNgEmailControl();
    });
  }

  recoverNgEmailControl(): void {
    this.inputReady.emit(this.emailFormControll);
    this.listenEmailStatusChanges();
  }

  listenEmailStatusChanges(): void {
    const emailControll = this.emailFormControll.getNgControl();
    emailControll?.statusChanges.subscribe((status) => {
      this.atualizeEmailErrorMessage(status);
    });
  }

  atualizeEmailErrorMessage(status: FormControlStatus): void {
    this.validating.emit(status === 'PENDING');
  }
}
