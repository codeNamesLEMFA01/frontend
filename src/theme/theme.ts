// import { createTheme } from "@mui/material/styles"
import { createTheme } from "@mui/material"

import { customPalette } from "./const/customPalette"

export const theme = createTheme({
  palette: {
    ...customPalette,
  },
})
