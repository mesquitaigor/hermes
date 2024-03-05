import { FormControl } from '@angular/forms';
import PasswordValidator from './PasswordValidatior';

describe(PasswordValidator.name, () => {
  const abstractControll = new FormControl('');
  describe(PasswordValidator.shouldHaveNumbers.name, () => {
    it('should return null if password has at least one number', () => {
      abstractControll.setValue('a1');
      const result = PasswordValidator.shouldHaveNumbers(abstractControll);
      expect(result).toBeNull();
    });

    it('should return an object with shouldHaveNumbers key if password has no numbers', () => {
      abstractControll.setValue('a');
      const result = PasswordValidator.shouldHaveNumbers(abstractControll);
      expect(result).toEqual({ shouldHaveNumbers: true });
    });
  });

  describe(PasswordValidator.shouldHaveLowerLetters.name, () => {
    it('should return null if password has at least one lower letter', () => {
      abstractControll.setValue('Aa');
      const result = PasswordValidator.shouldHaveLowerLetters(abstractControll);
      expect(result).toBeNull();
    });

    it('should return an object with shouldHaveLowerLetters key if password has no lower letters', () => {
      abstractControll.setValue('A');
      const result = PasswordValidator.shouldHaveLowerLetters(abstractControll);
      expect(result).toEqual({ shouldHaveLowerLetters: true });
    });
  });

  describe(PasswordValidator.shouldHaveUpperLetters.name, () => {
    it('should return null if password has at least one upper letter', () => {
      abstractControll.setValue('aA');
      const result = PasswordValidator.shouldHaveUpperLetters(abstractControll);
      expect(result).toBeNull();
    });

    it('should return an object with shouldHaveUpperLetters key if password has no upper letters', () => {
      abstractControll.setValue('a');
      const result = PasswordValidator.shouldHaveUpperLetters(abstractControll);
      expect(result).toEqual({ shouldHaveUpperLetters: true });
    });
  });

  describe(PasswordValidator.shouldHavespecialCharacters.name, () => {
    it('should return null if password has at least one special character', () => {
      abstractControll.setValue('aA!');
      const result =
        PasswordValidator.shouldHavespecialCharacters(abstractControll);
      expect(result).toBeNull();
    });

    it('should return an object with shouldHavespecialCharacters key if password has no special characters', () => {
      abstractControll.setValue('aA');
      const result =
        PasswordValidator.shouldHavespecialCharacters(abstractControll);
      expect(result).toEqual({ shouldHavespecialCharacters: true });
    });
  });
});
