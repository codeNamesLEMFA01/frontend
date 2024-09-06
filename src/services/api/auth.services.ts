import { ILogoutApi, LoginApi, RegisterApi } from "@src/types/auth.types"

const BASE_URL = `/auth`

export const postUserRegister = async (formData: FormData): Promise<RegisterApi> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: formData,
  })
  const data = await response.json()

  return data
}

export const getUserMe = async () => {
  const response = await fetch(`${BASE_URL}/users/me`)
  if (!response.ok)
    throw new Error(
      `🆘 status => ${response.status}, statusText: ${response.statusText}`,
    )
  const data = await response.json()
  return data
}

export const postUserLogin = async (formData: FormData): Promise<LoginApi> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: formData,
  })
  const data = await response.json()

  return data
}

export const postUserLogout = async (): Promise<ILogoutApi> => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  })
  if (!response.ok)
    throw new Error(
      `🆘 status => ${response.status}, statusText: ${response.statusText}`,
    )
  const data = await response.json()
  return data
}
