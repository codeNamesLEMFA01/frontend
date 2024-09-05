export const TOKEN_NAME = "code_names_access_token"

export function getCookie(name: string) {
  const cookiesArray = document.cookie.split(";")

  for (const cookie of cookiesArray) {
    const [key, value] = cookie.split("=")
    if (key === name) return value
  }
  return null
}

export const getToken = () => getCookie(TOKEN_NAME)
