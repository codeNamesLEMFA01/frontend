import { alpha, getContrastRatio } from "@mui/material/styles"

const primary = "#0B4678"
const secondary = "#6D2E46"
const light = "#E1D7CD"
// const maleBase = "#118ab2"
const maleBase = "#1976D2"
const maleMain = alpha(maleBase, 0.7)
// const femaleBase = "#ef476f"
const femaleBase = "#A26769"
const femaleMain = alpha(femaleBase, 0.7)
const sectionBase = "#e4e8f3"
const sectionMain = alpha(sectionBase, 0.7)

export const customPalette = {
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  light: {
    main: light,
  },
  male: {
    main: maleMain,
    dark: alpha(maleBase, 0.9),
    light: alpha(maleBase, 0.3),
    extraLight: alpha(maleBase, 0.1),
    contrastText: getContrastRatio(maleMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
  female: {
    main: femaleMain,
    dark: alpha(femaleBase, 0.9),
    light: alpha(femaleBase, 0.3),
    extraLight: alpha(femaleBase, 0.1),
    contrastText: getContrastRatio(femaleMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
  section: {
    main: sectionMain,
    dark: alpha(sectionBase, 0.9),
    light: alpha(sectionBase, 0.5),
    darker: alpha(sectionBase, 1),
    contrastText: getContrastRatio(sectionMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
}

export type CustomPalette = typeof customPalette
