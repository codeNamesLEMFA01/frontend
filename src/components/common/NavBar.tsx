import { useEffect, useState } from "react"

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"

import { IAuth } from "@src/interfaces/IAuth"
import authLogout from "@src/services/auth/authLogout.service"
import { getCookie } from "@src/services/cookies/cookiesHandler.service"
// import authUser from "@src/services/auth/authUser.service"

const NavBar = ({ isAuth, setIsAuth }: IAuth) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const token = getCookie("token")

//   const userData = token && authUser(token)
    
  useEffect(() => {
    if (token) {
        if (isSubmitted) {
            authLogout()
            setIsAuth(false)
        }
    }
  }, [token, isAuth, setIsAuth, isSubmitted])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {/* Hello {userData?.username} */}
          </Typography>
          <Button sx={{ color: "white" }} onClick={() => setIsSubmitted(true)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
