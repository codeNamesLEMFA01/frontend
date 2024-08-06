import { CustomPalette } from "../const/customPalette"

declare module "@mui/material/styles" {
  interface Theme {
    palette: Palette & CustomPalette
  }
  interface Palette {
    male: Palette["primary"]
    female: Palette["primary"]
    section: Palette["primary"]
  }

  interface PaletteOptions {
    male: PaletteOptions["primary"]
    female: PaletteOptions["primary"]
    section: PaletteOptions["primary"]
  }

  interface ColorOptions {
    male?: ColorOptions["primary"]
    female?: ColorOptions["primary"]
    section?: ColorOptions["primary"]
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    male: true
    female: true
    section: true
  }
}
