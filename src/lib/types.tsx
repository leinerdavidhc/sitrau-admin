export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface RegisterFormInputs {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface ErrorResponse {
  errors: { path: string; message: string }[];
  message?: string;
}

export interface User {
  email: string;
  name: string;
  lastName: string;
  iat: number;
  exp: number;
}

export interface VerifyAuthResponse {
  authorized: boolean;
  user: User;
  message: string;
}
