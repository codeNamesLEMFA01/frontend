import { Dispatch } from "react"

import {
  Alert,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import bg from "@assets/bb_amer-flag.webp"
import logo from "@assets/logo.png"
import { AlternateEmail, Password } from "@mui/icons-material"

import DarkCard from "@src/components/common/DarkCard/DarkCard"

import { EnumFields } from "@src/types/auth.types"

import useLoginForm from "./hooks/useLoginForm"

interface IProps {
  setIsConnected: Dispatch<React.SetStateAction<boolean>>
}
const SUBHEADER_SENTENCE = "-vous pour accéder aux statistiques de code names"
const LoginForm = ({ setIsConnected }: IProps) => {
  const {
    credentials,
    errorField,
    handleChangeCredentialsFields,
    isLoginForm,
    handleChangeForm,
    handleSubmit,
    toast,
    handleCloseToast,
  } = useLoginForm({ setIsConnected })

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
      <Snackbar
        open={toast.isOpen}
        onClose={handleCloseToast}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={handleCloseToast}
          elevation={6}
        >
          {toast.message}
        </Alert>
      </Snackbar>
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
              title={
                <Typography
                  textTransform="uppercase"
                  fontFamily="Montserrat"
                  fontWeight={700}
                  fontSize={24}
                  letterSpacing={3}
                  textAlign="center"
                >
                  code
                  <Box component="img" src={logo} width={48} />
                  names
                </Typography>
              }
              subheader={
                isLoginForm
                  ? `Connectez${SUBHEADER_SENTENCE}`
                  : `Inscrivez${SUBHEADER_SENTENCE}`
              }
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
                  id="email"
                  value={credentials.email}
                  error={errorField.email.isError}
                  helperText={errorField.email.message}
                  onChange={handleChangeCredentialsFields}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail
                          color={errorField.email.isError ? "error" : "primary"}
                        />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Password
                          color={errorField.password.isError ? "error" : "primary"}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Collapse in={!isLoginForm}>
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Password
                            color={
                              errorField.confirmPassword.isError
                                ? "error"
                                : "primary"
                            }
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Collapse>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "end", mt: 4, p: 2 }}>
              <Button variant="outlined" onClick={handleChangeForm} color="light">
                {isLoginForm ? "Je n'ai pas de compte" : "J'ai déjà un compte"}
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="formLogin"
                sx={{ bgcolor: "male.extralight" }}
              >
                {isLoginForm ? "Se connecter" : "S'enregistrer"}
              </Button>
            </CardActions>
          </DarkCard>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoginForm
