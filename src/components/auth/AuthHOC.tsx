import { useRef, useState } from "react"

import { getToken } from "@src/utils/auth/cookies"

import Login from "./Login/LoginForm"
import useAuth from "./hooks/useAuth"

const AuthHOC = ({ children }: { children: JSX.Element }) => {
  const [isConnected, setIsConnected] = useState(false)
  const { isError, isSuccess } = useAuth(isConnected)

  const tokenRef = useRef(getToken())

  if (isSuccess || isConnected) return children

  if (!tokenRef.current || isError) return <Login setIsConnected={setIsConnected} />

  return children
}

export default AuthHOC
