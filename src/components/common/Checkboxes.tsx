import { ChangeEvent, forwardRef } from "react"

import { Checkbox, CheckboxProps } from "@mui/material"

import FemaleIcon from "@mui/icons-material/Female"
import Groups2Icon from "@mui/icons-material/Groups2"
import MaleIcon from "@mui/icons-material/Male"
import { customPalette } from "@src/theme/const/customPalette"

interface ICheckboxes extends Omit<CheckboxProps, "checked" | "onChange"> {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
}

function sxRipple(color: string, bgcolor: string) {
  return {
    "&:hover, &.Mui-checked": {
      color,
    },
    "&:hover": {
      bgcolor,
    },
  }
}
export const CheckboxFemale = forwardRef<HTMLButtonElement, ICheckboxes>(
  ({ checked, onChange, name = "female", ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        name={name}
        checked={checked}
        onChange={onChange}
        inputProps={{
          "aria-label": "activation du filtre pour les femmes",
        }}
        icon={<FemaleIcon />}
        checkedIcon={
          <FemaleIcon
            sx={{
              color: customPalette.female.main,
            }}
          />
        }
        sx={sxRipple(customPalette.female.main, customPalette.female.extraLight)}
        {...props}
      />
    )
  },
)
export const CheckboxMale = forwardRef<HTMLButtonElement, ICheckboxes>(
  ({ checked, onChange, name = "male", ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        name={name}
        checked={checked}
        onChange={onChange}
        inputProps={{
          "aria-label": "activation du filtre pour les hommes",
        }}
        icon={<MaleIcon />}
        checkedIcon={
          <MaleIcon
            sx={{
              color: customPalette.male.main,
            }}
          />
        }
        sx={sxRipple(customPalette.male.main, customPalette.male.extraLight)}
        {...props}
      />
    )
  },
)
export const CheckboxGroups = forwardRef<HTMLButtonElement, ICheckboxes>(
  ({ checked, onChange, name = "groups", ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        name={name}
        checked={checked}
        onChange={onChange}
        inputProps={{
          "aria-label": `activation du filtre pour les ${name}`,
        }}
        icon={<Groups2Icon />}
        checkedIcon={
          <Groups2Icon
            sx={{
              color: "common.black",
            }}
          />
        }
        sx={sxRipple("common.black", "lightgrey")}
        {...props}
      />
    )
  },
)
