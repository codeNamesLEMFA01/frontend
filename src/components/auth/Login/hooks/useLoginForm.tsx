import React, { Dispatch, useState } from "react"

import { AlertColor } from "@mui/material"

import { postUserLogin, postUserRegister } from "@src/services/api/auth.services"

import { errorMessageStorage } from "@src/utils/auth/errorMessageStorage"

import { isApiError } from "@src/types/guards/auth.guard"

import useCheckCredentials from "./useCheckCredentials"

interface IProps {
  setIsConnected: Dispatch<React.SetStateAction<boolean>>
}
interface IToast {
  isOpen: boolean
  message: string
  severity: AlertColor
}
const useLoginForm = ({ setIsConnected }: IProps) => {
  const toastError = errorMessageStorage
  const { message, severity } = toastError.getError()
  const {
    credentials,
    errorField,
    handleChangeCredentialsFields,
    isErrorToggleFields,
  } = useCheckCredentials()
  const [isLoginForm, setIsLoginForm] = useState(true)

  const [toast, setToast] = useState<IToast>({
    isOpen: toastError.isError(),
    message,
    severity,
  })

  function handleChangeForm() {
    setIsLoginForm(!isLoginForm)
  }

  function handleCloseToast() {
    setToast((prev) => ({ ...prev, isOpen: false, message: "" }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (isErrorToggleFields(credentials, isLoginForm)) return
    if (!data.get("email") || !data.get("password")) return

    data.append("username", data.get("email") as string)

    // setIsError()
    const isConnected = isLoginForm
      ? await postUserLogin(data)
      : await postUserRegister(data)

    if (isApiError(isConnected)) {
      toastError.setError(isConnected.detail, "error")
      window.location.reload()
      return
    }
    toastError.clearError()
    setIsConnected(true)
  }
  return {
    credentials,
    errorField,
    handleChangeCredentialsFields,
    isLoginForm,
    handleChangeForm,
    handleSubmit,
    toast,
    handleCloseToast,
  }
}

export default useLoginForm
