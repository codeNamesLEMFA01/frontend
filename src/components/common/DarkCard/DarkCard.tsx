import { PropsWithChildren } from "react"

import { Card, CardProps, ThemeProvider } from "@mui/material"

import { darkTheme } from "@src/theme"

const DarkCard = ({ children, ...props }: PropsWithChildren<CardProps>) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Card {...props}>{children}</Card>
    </ThemeProvider>
  )
}

export default DarkCard
