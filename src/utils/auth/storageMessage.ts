import { AlertColor } from "@mui/material"

const KEY_NAME = "code_names_message"
const KEY_COLOR = "code_names_color"

const setErrorColor = (color: AlertColor) => {
  localStorage.setItem(KEY_COLOR, color)
}

export const setMessage = (message: string, color: AlertColor) => {
  localStorage.setItem(KEY_NAME, message)
  setErrorColor(color)
}

export const haveMessage = () => localStorage.getItem(KEY_NAME) !== null
export const clearMessage = () => localStorage.removeItem(KEY_NAME)
export const getMessage = () => {
  const message = localStorage.getItem(KEY_NAME) ?? "Un message d'info"
  const severity: AlertColor =
    (localStorage.getItem(KEY_COLOR) as AlertColor) ?? "info"
  return { message, severity }
}

export const storageMessage = {
  haveMessage,
  clearMessage,
  setMessage,
  getMessage,
}
