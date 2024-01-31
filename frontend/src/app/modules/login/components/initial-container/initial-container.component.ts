import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlOptions, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import EmailValidator from '../../../../shared/validators/EmailValidator';
import { HttpClient } from '@angular/common/http';
import { skip } from 'rxjs';

@Component({
  selector: 'initial-container',
  templateUrl: 'initial-container.component.html',
  styleUrls: ['initial-container.component.scss'],
})
export default class InitialContainerComponent{
  @Input() registerForm?: FormGroup
  @Output() createAccount = new EventEmitter()
  emailFormControll: FormControlOptions = {
    validators: [
      Validators.required,
      EmailValidator.format,
    ],
    asyncValidators: [
      EmailValidator.existing(this.httpClient)
    ],
    updateOn: 'submit'
  }
  errors = {
    index: -1,
    messages: [
      'Digite seu email para podermos começar.',
      'Email inválido.',
      'Email já possui cadastrado.'
    ]
  }
  validatingEmail = false

  constructor(
    private httpClient: HttpClient
  ){}

  handleGetEmailFormControl(control: any){
    if(this.registerForm){
      this.registerForm.addControl('email', control)
      this.listenEmailStatusChanges()
    }
  }

  listenEmailStatusChanges(){
    if(this.registerForm){
      const emailControll = this.registerForm.get('email')
      emailControll?.statusChanges.subscribe((status) => {
        this.atualizeEmailErrorMessage(status)
      })
    }
  }

  atualizeEmailErrorMessage(status: FormControlStatus){
    if(this.registerForm){
      const emailControll = this.registerForm.get('email')
      if(emailControll){
        this.validatingEmail = status === 'PENDING'
        if(status == 'VALID' || status == 'PENDING'){
          this.errors.index = -1
        }else if(status == 'INVALID' && emailControll?.touched){
          if(emailControll?.errors?.['required']){
            this.errors.index = 0
          }else if(emailControll?.errors?.['invalidFormat']){
            this.errors.index = 1
          }else if(emailControll?.errors?.['existing']){
            this.errors.index = 2
          }
        }
      }
    }
  }

  handleCreateAccount(){
    if(this.registerForm){
      const emailFormControll = this.registerForm.get('email')
      if(emailFormControll){
        emailFormControll.statusChanges
          .pipe(skip(1))
          .subscribe((status: FormControlStatus) => {
            if(status == 'VALID' && emailFormControll.valid){
              this.createAccount.emit()
            }
          })
        emailFormControll.markAsTouched()
        emailFormControll.updateValueAndValidity();
      }
    }
  }
}
