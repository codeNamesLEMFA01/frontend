import { Suspense, useEffect, useState } from "react"

import { Box, Button, FormControl, TextField, Typography } from "@mui/material"

import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsLengthNameComponent from "./components/TrendsComponent/TrendsLengthNameComponent/TrendsLengthNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import Hero from "./components/hero/Hero"

function App() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

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

  const authLogin = async (username: string, password: string) => { 
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      localStorage.setItem("token", data.access_token)
    } catch (error) {
      console.error("🆘", error)
    }
  }
  const authLogout = () => {
    localStorage.removeItem("token")
  }

  if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null) {
    return (
      <>
    {localStorage.getItem("token") ? <button onClick={() => authLogout()}>Logout</button> : (
      <FormControl required>
        <TextField id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <TextField id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <Button
        type="submit"
        onClick={() => authLogin(username, password)}
        >
          Submit
        </Button>
      </FormControl>
      
    )}
    </>
    )
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
