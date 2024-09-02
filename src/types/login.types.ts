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

export type IsLogginForm = boolean
