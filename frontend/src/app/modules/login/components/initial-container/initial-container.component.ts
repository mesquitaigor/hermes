import { Component, ElementRef } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { skip } from 'rxjs';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import LoginPageService from '../../resources/login.page.service';

@Component({
  selector: 'initial-container',
  templateUrl: 'initial-container.component.html',
  styleUrls: ['initial-container.component.scss'],
})
export default class InitialContainerComponent{

  validatingEmail = false

  constructor(
    private loginPageService: LoginPageService
  ){}

  handleValidatingEmail(stt: boolean){
    this.validatingEmail = stt
  }

  handleCreateAccount(){
    const emailFormControll = this.loginPageService.get(RegisterFormInputNames.EMAIL)
    if(emailFormControll){
      emailFormControll.statusChanges
        .pipe(skip(1))
        .subscribe((status: FormControlStatus) => {
          if(status == 'VALID' && emailFormControll.valid){
            this.loginPageService.displayRegisterContent()
          }
        })
      emailFormControll.markAsTouched()
      emailFormControll.updateValueAndValidity();
    }
  }
}
