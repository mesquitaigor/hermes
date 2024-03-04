export namespace IInitialContainer {
  export interface OutActions {
    action: outDisplayValue;
    email: string;
  }

  export type outDisplayValue = 'display-login' | 'display-register';
}
