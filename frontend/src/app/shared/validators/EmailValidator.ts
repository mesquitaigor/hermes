import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable, map } from 'rxjs';

export default class EmailValidator{
  static format(control: AbstractControl): { [key: string]: any } | null {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (control.value?.match(validRegex)) {
      return null
    }else{
      return {
        invalidFormat: 'Email inválido'
      }
    }
  }
  static existing(httpClient: HttpClient){
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return httpClient.get<{existing: boolean, user: number}>('http://localhost:3500/users/validate-email', {params: {email: control.value}})
        .pipe(map((res: {existing: boolean, user: number}) => {
          if(res.existing){
            return {existing: true}
          }
          return null
        }))
    }
  }
}
