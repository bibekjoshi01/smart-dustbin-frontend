export interface IAuthState {
  email: string;
  tokens?: {
    access: string;
    refresh: string;
  };
  isAuthenticated: boolean;
}

export interface UnverifiedLoginState {
  message: string;
}

export interface LoginFormDataType {
  persona: string;
  password: string;
}