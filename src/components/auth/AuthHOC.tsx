import { IsLogginForm } from "@src/types/login.types"

import Login from "./Login/LoginForm"

const AuthHOC = ({ children }: { children: JSX.Element }) => {
  const isLogged: IsLogginForm = false
  const isConnected = false
  // WAITING FOR API

  if (!isConnected) return <Login isLogged={isLogged} />
  return children
}

export default AuthHOC
