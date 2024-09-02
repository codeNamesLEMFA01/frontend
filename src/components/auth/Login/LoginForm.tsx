import { useState } from "react"

import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Stack,
  TextField,
} from "@mui/material"

import bg from "@assets/bb_amer-flag.webp"

import DarkCard from "@src/components/common/DarkCard/DarkCard"

import { EnumFields, IsLogginForm } from "@src/types/login.types"

import useCheckCredentials from "./hooks/useCheckCredentials"

const LoginForm = ({ isLogged }: { isLogged: IsLogginForm }) => {
  const {
    credentials,
    errorField,
    handleChangeCredentialsFields,
    isErrorToggleFields,
  } = useCheckCredentials()
  const [isLogginForm, setIsLogginForm] = useState(isLogged)

  function handleChangeForm() {
    setIsLogginForm(!isLogginForm)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (isErrorToggleFields(credentials, isLogginForm)) return

    if (isLogginForm) {
      // Request to login
      console.log("LOGGIN FORM ", {
        email: data.get("email"),
        password: data.get("password"),
      })
    } else {
      // Request to register
      console.log("REGISTER FORM ", {
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
      })
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          backdropFilter: "blur(12px) grayscale(50%)",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Stack alignItems="center" mt={"15vh"}>
          <DarkCard
            sx={{
              width: "clamp(300px, 80vw, 500px)",
              boxShadow:
                "0px 11px 15px -7px rgba(0, 0, 0, 0.3), 0px 24px 38px 3px rgba(0, 0, 0, 0.4), 0px 9px 46px 8px rgba(0, 0, 0, 0.5);",
              // minHeight: "50vh",
            }}
            elevation={24}
          >
            <CardHeader
              title="Bienvenue sur Code Names"
              subheader={isLogginForm ? "Connexion" : "Inscription"}
            />
            <CardContent>
              <Stack
                component={"form"}
                id="formLogin"
                noValidate
                gap={4}
                onSubmit={handleSubmit}
              >
                <TextField
                  required
                  name={EnumFields.EMAIL}
                  label="Email"
                  type="email"
                  value={credentials.email}
                  error={errorField.email.isError}
                  helperText={errorField.email.message}
                  onChange={handleChangeCredentialsFields}
                />

                <TextField
                  required
                  name={EnumFields.PASSWORD}
                  label="Mot de passe"
                  type="password"
                  value={credentials.password}
                  error={errorField.password.isError}
                  helperText={errorField.password.message}
                  onChange={handleChangeCredentialsFields}
                />
                <Collapse in={!isLogginForm}>
                  <TextField
                    required
                    name={EnumFields.CONFIRM_PASSWORD}
                    label="Confirmer le mot de passe"
                    type="password"
                    value={credentials.confirmPassword}
                    error={errorField.confirmPassword.isError}
                    helperText={errorField.confirmPassword.message}
                    onChange={handleChangeCredentialsFields}
                    fullWidth
                  />
                </Collapse>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "end", mt: 4, p: 2 }}>
              <Button variant="outlined" onClick={handleChangeForm}>
                {isLogginForm ? "Je n'ai pas de compte" : "J'ai déjà un compte"}
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="formLogin"
                sx={{ bgcolor: "male.extralight" }}
              >
                {isLogginForm ? "Se connecter" : "S'enregistrer"}
              </Button>
            </CardActions>
          </DarkCard>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoginForm
