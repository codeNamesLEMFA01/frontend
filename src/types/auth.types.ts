export interface ICredentials {
  email: string
  password: string
  confirmPassword: string
}

export enum EnumFields {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export type IsLoginForm = boolean

export interface IRegisterSuccessApi {
  message: string
  access_token: string
  token_type: string
}

export interface IErrorApi {
  detail: string
  status: number
}

export type RegisterApi = IRegisterSuccessApi | IErrorApi

export interface ILoginSuccessApi {
  access_token: string
  token_type: string
}

export type LoginApi = ILoginSuccessApi | IErrorApi

export interface ILogoutApi {
  message: string
}
