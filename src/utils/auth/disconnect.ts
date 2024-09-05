const KEY_NAME = "isDisconnected"

export const disconnect = () => {
  localStorage.setItem(KEY_NAME, "true")
  window.location.reload()
}

export const isDisconnected = () => localStorage.getItem(KEY_NAME) !== null

export const clearIsDisconnected = () => localStorage.removeItem(KEY_NAME)
