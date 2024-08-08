import { Box, Button, FormControl, TextField } from "@mui/material";
import authLogin from "@src/services/auth/authLogin.service";
import { useEffect, useState } from "react";
import { IAuth } from "../../interfaces/IAuth";

const LoginForm = ({isAuth, setIsAuth}: IAuth) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    useEffect(() => {
        if (!isAuth) {
            if (!isSubmitted) return
            authLogin(username, password).then((res) => {
                if (res) {
                    setIsAuth(true)
                }
            })
        }
    }
    , [isAuth, username, password, setIsAuth, isSubmitted])

    return (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center", height:"100vh"}}>
        <h1>Login</h1>
        <FormControl required>
          <TextField sx={{marginBottom:"1em"}} id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <TextField id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <Button
          type="submit"
          onClick={() => {
            setIsSubmitted(true)
            setTimeout(() => {
                setIsSubmitted(false)
            }, 5000)
            
          }}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
      )
}

export default LoginForm