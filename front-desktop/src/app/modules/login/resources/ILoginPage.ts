export namespace ILoginPage {
  export type loginContentNames = 'initial' | 'register' | 'login';
  export interface LoginPageEvents {
    displayContent?: loginContentNames;
  }
}
