export interface OutInitialContainerAction {
  action: outInitialContainerDisplayValue;
  email: string;
}

export type outInitialContainerDisplayValue =
  | 'display-login'
  | 'display-register';
