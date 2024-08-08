import { Suspense, useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"

import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsLengthNameComponent from "./components/TrendsComponent/TrendsLengthNameComponent/TrendsLengthNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import Hero from "./components/hero/Hero"
import { getTotalBySex } from "@src/services/api/names.services"
import { useQuery } from "@tanstack/react-query"
import Plot from "react-plotly.js"
import LoginForm from "./components/LoginForm"
import NavBar from "./components/NavBar"
import { getCookie } from "./services/cookies/cookiesHandler.service"

interface IObjAcc {
  x: string[]
  yM: number[]
  yF: number[]
}

function App() {

  const [isAuth, setIsAuth] = useState<boolean>(false)
  const token = getCookie("token")

  const { data: names } = useQuery({
    queryKey: ["names"],
    queryFn: async () => await getTotalBySex(),
    retry: false,
    staleTime: Infinity,
  })
  const [data, setData] = useState<IObjAcc>()

  useEffect(() => {
    if (!names) return
    const obj: IObjAcc = { x: [], yM: [], yF: [] }
    const data = Object.entries(names.data).reduce((acc, [key, value]) => {
      acc.yM.push(value.M)
      acc.yF.push(value.F)
      acc.x.push(key)
      return acc
    }, obj)
    console.log("🆘 DATA", data)
    setData(data)
  }, [names]);

  if (!isAuth && !token && token === undefined) {
    return <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
  }
  
  return (
    <Box>
      <Hero />
      <TotalComponent />
      <TrendsByNameComponent />
      <TrendsTopNamesComponent />
      <TrendsLengthNameComponent />
    </Box>
  )
}

export default App
