import { Typography, TypographyProps } from "@mui/material"

export const TypoName = (props: TypographyProps) => (
  <Typography
    component="span"
    fontStyle={"italic"}
    sx={{ textDecoration: "underline", ...props.sx }}
    {...props}
  >
    {props.children}
  </Typography>
)

type NumberProps = {
  number: number | string
  isCurrency?: boolean
  isPercent?: boolean
} & TypographyProps

export const TypoNumber = ({
  number,
  isCurrency,
  isPercent,
  ...props
}: NumberProps) => {
  const options: Intl.NumberFormatOptions = !isCurrency
    ? {}
    : { style: "currency", currency: "EUR" }
  const num = new Intl.NumberFormat("fr-FR", options).format(+number)
  return (
    <Typography component="span" {...props}>
      {num}
      {isPercent && "%"}{" "}
    </Typography>
  )
}
