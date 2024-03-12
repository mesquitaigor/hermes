export namespace ILoginPage {
  export type loginContentNames = 'initial' | 'register' | 'login';
  export interface LoginPageEvents {
    displayContent?: loginContentNames;
  }
  export enum InputNames {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PASSWORD = 'password',
    PASSWORD_CONFIRMATION = 'passwordConfirmation',
    EMAIL = 'email',
  }
}
