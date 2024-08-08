import { useState } from "react"

import { Box } from "@mui/material"

import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsLengthNameComponent from "./components/TrendsComponent/TrendsLengthNameComponent/TrendsLengthNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import Hero from "./components/hero/Hero"
import LoginForm from "./components/LoginFormComponent/LoginForm"
import NavBar from "./components/common/NavBar"
import { getCookie } from "./services/cookies/cookiesHandler.service"


function App() {

  const [isAuth, setIsAuth] = useState<boolean>(false)
  const token = getCookie("token")

  if (!isAuth && !token && token === undefined) {
    return <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
  }
  
  return (
    <Box>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Hero />
      <TotalComponent />
      <TrendsByNameComponent />
      <TrendsTopNamesComponent />
      <TrendsLengthNameComponent />
    </Box>
  )
}

export default App
