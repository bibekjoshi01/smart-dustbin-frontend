export interface IAuthState {
  id: number;
  email: string;
  isActive: boolean;
  createdAt: string;
  isAuthenticated?: boolean;
  message: string;
  accessToken?: string;
}

export interface ProfileResponse {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  message: string;
}

export interface UnverifiedLoginState {
  message: string;
}

export interface LoginFormDataType {
  email: string;
  password: string;
}