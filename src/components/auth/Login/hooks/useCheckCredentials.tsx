import { useState } from "react"

import isEmail from "validator/lib/isEmail"
import isStrongPassword from "validator/lib/isStrongPassword"

import { EnumFields, ICredentials, IsLoginForm } from "@src/types/auth.types"

const PASSWORD_OPTIONS = {
  minLength: 3,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
}

const MESSAGE_PASSWORD = `Le mot de passe doit contenir au moins ${PASSWORD_OPTIONS.minLength} caractères`
// eslint-disable-next-line react-refresh/only-export-components
const MESSAGE: Record<"error" | "valid", Record<EnumFields, string>> = {
  error: {
    password: MESSAGE_PASSWORD,
    confirmPassword: "Le mot de passe ne correspond pas",
    email: "Email invalide",
  },
  valid: {
    password: MESSAGE_PASSWORD,
    confirmPassword: "Le mot de passe doit être identique",
    email: "",
  },
}

const useCheckCredentials = () => {
  const [credentials, setCredentials] = useState<ICredentials>({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorField, setErrorField] = useState<
    Record<EnumFields, { isError: boolean; message: string }>
  >({
    email: { isError: false, message: MESSAGE.valid.email },
    password: { isError: false, message: MESSAGE.valid.password },
    confirmPassword: { isError: false, message: MESSAGE.valid.confirmPassword },
  })

  function setError(isValid: boolean, name: EnumFields) {
    if (isValid) {
      setErrorField((prev) => ({
        ...prev,
        [name]: { isError: false, message: MESSAGE.valid[name] },
      }))
    } else {
      setErrorField((prev) => ({
        ...prev,
        [name]: { isError: true, message: MESSAGE.error[name] },
      }))
    }
  }

  const handleChangeCredentialsFields = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    switch (name) {
      case EnumFields.PASSWORD:
        setError(isStrongPassword(value, PASSWORD_OPTIONS), EnumFields.PASSWORD)
        break
      case EnumFields.CONFIRM_PASSWORD:
        setError(value === credentials.password, EnumFields.CONFIRM_PASSWORD)
        break
      case EnumFields.EMAIL:
        setError(isEmail(value), EnumFields.EMAIL)
        break
    }

    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  function isErrorToggleFields(
    credentials: ICredentials,
    isLogginForm: IsLoginForm,
  ) {
    const resEmail = isEmail(credentials.email)
    const resPassword = isStrongPassword(credentials.password, PASSWORD_OPTIONS)
    setError(resEmail, EnumFields.EMAIL)
    setError(resPassword, EnumFields.PASSWORD)

    if (!isLogginForm) {
      const resConfirmPassword = credentials.confirmPassword === credentials.password
      setError(resConfirmPassword, EnumFields.CONFIRM_PASSWORD)
      return !resEmail || !resPassword || !resConfirmPassword
    }
    return !resEmail || !resPassword
  }
  return {
    credentials,
    errorField,
    isErrorToggleFields,
    handleChangeCredentialsFields,
  }
}

export default useCheckCredentials
