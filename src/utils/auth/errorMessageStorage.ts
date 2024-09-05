import { AlertColor } from "@mui/material"

const KEY_NAME = "code_names_error"
const KEY_COLOR = "code_names_color"

const setErrorColor = (color: AlertColor) => {
  localStorage.setItem(KEY_COLOR, color)
}

export const setError = (message: string, color: AlertColor) => {
  localStorage.setItem(KEY_NAME, message)
  setErrorColor(color)
}

export const isError = () => localStorage.getItem(KEY_NAME) !== null
export const clearError = () => localStorage.removeItem(KEY_NAME)
export const getError = () => {
  const message = localStorage.getItem(KEY_NAME) ?? "Une erreur est survenue"
  const severity: AlertColor =
    (localStorage.getItem(KEY_COLOR) as AlertColor) ?? "error"
  return { message, severity }
}

export const errorMessageStorage = {
  isError,
  clearError,
  setError,
  getError,
}
