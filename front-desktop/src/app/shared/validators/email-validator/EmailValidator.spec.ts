import { FormControl } from '@angular/forms';
import EmailValidator from './EmailValidator';
import AuthService from '../../auth/auth.service';
import AuthServiceMock from '../../auth/test/AuthServiceMock.spec';
import { waitForAsync } from '@angular/core/testing';

describe(EmailValidator.name, () => {
  const abstractControll = new FormControl('');
  const authServiceMock = new AuthServiceMock();
  let authService: jasmine.SpyObj<AuthService>;
  beforeEach(() => {
    authService = authServiceMock.build();
    authServiceMock.emailExisting.existing = false;
    authServiceMock.checkEmailErrorResponse = false;
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
  it('should return null when email is not registered', waitForAsync(() => {
    const validatorFn = EmailValidator.existing(authService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res).toBeNull();
    });
  }));
  it('should return "existing" when email is registered', waitForAsync(() => {
    authServiceMock.emailExisting.existing = true;
    const validatorFn = EmailValidator.existing(authService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res?.existing).toEqual(true);
    });
  }));
  it('should return "nonexisting" when email is no registered', waitForAsync(() => {
    authServiceMock.emailExisting.existing = false;
    const validatorFn = EmailValidator.nonExisting(authService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res?.nonexisting).toEqual(true);
    });
  }));
  it('should return "validatorHttpError" when email is no registered', waitForAsync(() => {
    authServiceMock.checkEmailErrorResponse = true;
    const validatorFn = EmailValidator.existing(authService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res?.validatorHttpError).toEqual(true);
    });
  }));
});
