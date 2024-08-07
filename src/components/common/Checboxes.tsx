import { ChangeEvent } from "react"

import { Checkbox } from "@mui/material"

import FemaleIcon from "@mui/icons-material/Female"
import Groups2Icon from "@mui/icons-material/Groups2"
import MaleIcon from "@mui/icons-material/Male"
import { customPalette } from "@src/theme/const/customPalette"

interface IChecboxes {
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
export const ChecboxFemale = ({
  checked,
  onChange,
  name = "female",
}: IChecboxes) => {
  return (
    <Checkbox
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
    />
  )
}
export const ChecboxMale = ({ checked, onChange, name = "male" }: IChecboxes) => {
  return (
    <Checkbox
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
    />
  )
}
export const ChecboxGroups = ({
  checked,
  onChange,
  name = "groups",
}: IChecboxes) => {
  return (
    <Checkbox
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
    />
  )
}
