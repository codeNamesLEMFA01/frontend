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
} & TypographyProps

export const TypoNumber = ({ number, isCurrency, ...props }: NumberProps) => {
  const options = !isCurrency ? {} : { style: "currency", currency: "EUR" }
  const num = new Intl.NumberFormat("fr-FR", options).format(+number)
  return (
    <Typography component="span" {...props}>
      {num}{" "}
    </Typography>
  )
}
