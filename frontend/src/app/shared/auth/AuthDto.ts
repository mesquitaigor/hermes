export namespace AuthDto {
  export interface EmailValidatePayload {
    email: string;
  }
  export interface AuthenticatePayload {
    email: string;
    password: string;
  }
  export interface RegisterPayload {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }
  export interface EmailValidateResponse {
    existing: boolean;
    user: number;
  }
  export interface AuthenticateResponse {
    accessToken: boolean;
  }
  export interface RegisterResponse {
    createdUser: null | number;
    created: boolean;
    error: string;
  }
}
