import { FormControl } from '@angular/forms';
import EmailValidator from './EmailValidator';
import { Observable, Subscriber } from 'rxjs';
import AuthService from '../../auth/auth.service';
import { AuthDto } from '../../auth/AuthDto';

describe(EmailValidator.name, () => {
  const abstractControll = new FormControl('');
  const mockAuthService = jasmine.createSpyObj(AuthService.name, [
    'validateEmail',
  ]);
  let apiReturn: AuthDto.EmailValidateResponse = { existing: false, user: 0 };
  mockAuthService.validateEmail.and.callFake(() => {
    return new Observable(
      (subject: Subscriber<AuthDto.EmailValidateResponse>) => {
        subject.next(apiReturn);
      }
    );
  });
  beforeEach(() => {
    apiReturn.existing = false;
  });
  it('should return null when email is valid', () => {
    abstractControll.setValue('email@email.com');
    expect(EmailValidator.format(abstractControll)).toBeNull();
  });
  it('should return invalidFormat when email is invalid', () => {
    abstractControll.setValue('email');
    expect(EmailValidator.format(abstractControll)).toEqual({
      invalidFormat: true,
    });
  });
  it('should return null when email is not registered', () => {
    const validatorFn = EmailValidator.existing(mockAuthService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res).toBeNull();
    });
  });
  it('should return existing when email is invalid', () => {
    apiReturn.existing = true;
    const validatorFn = EmailValidator.existing(mockAuthService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res?.existing).toEqual(true);
    });
  });
});
