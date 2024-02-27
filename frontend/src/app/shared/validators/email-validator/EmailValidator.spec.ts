import { FormControl } from '@angular/forms';
import EmailValidator from './EmailValidator';
import { Observable, Subscriber } from 'rxjs';
import UserService from '../../../domains/users/user.service';
import EmailAvailabilityResponse from '../../../domains/users/dto/EmailAvailabilityResponse';

describe(EmailValidator.name, () => {
  const abstractControll = new FormControl('');
  const mockUserService = jasmine.createSpyObj(UserService.name, [
    'checkEmailAvailability',
  ]);
  let apiReturn: EmailAvailabilityResponse = { existing: false, user: 0 };
  mockUserService.checkEmailAvailability.and.callFake(() => {
    return new Observable((subject: Subscriber<EmailAvailabilityResponse>) => {
      subject.next(apiReturn);
    });
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
    const validatorFn = EmailValidator.existing(mockUserService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res).toBeNull();
    });
  });
  it('should return existing when email is invalid', () => {
    apiReturn.existing = true;
    const validatorFn = EmailValidator.existing(mockUserService);
    validatorFn(abstractControll).subscribe((res) => {
      expect(res?.existing).toEqual(true);
    });
  });
});
