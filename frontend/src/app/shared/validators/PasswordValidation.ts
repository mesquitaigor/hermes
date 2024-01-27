import { AbstractControl } from '@angular/forms'
export default class PasswordValidaton{

  static passwordConfirmationIsEqual(control: AbstractControl): { [key: string]: any } | null{
    if(control.get('password')?.value !== control.get('passwordConfirmation')?.value){
      return { differentPasswords: true }
    }else{
      return null
    }
  }

  static shouldHaveNumbers(control: AbstractControl){
    if(!/\d/.test(control.value)){
      return { shouldHaveNumbers: true }
    }else{
      return null
    }
  }

  static shouldHaveLowerLetters(control: AbstractControl){
    if(!/[a-z]/.test(control.value)){
      return { shouldHaveLowerLetters: true }
    }else{
      return null
    }
  }

  static shouldHaveUpperLetters(control: AbstractControl){
    if(!/[A-Z]/.test(control.value)){
      return { shouldHaveUpperLetters: true }
    }else{
      return null
    }
  }

  static shouldHavespecialCharacters(control: AbstractControl){
    if(!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)){
      return { shouldHavespecialCharacters: true }
    }else{
      return null
    }
  }

}
