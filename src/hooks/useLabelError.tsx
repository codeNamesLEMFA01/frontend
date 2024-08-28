import { useState } from "react"

import { Typography, TypographyProps } from "@mui/material"

const useLabelError = () => {
  const [isLabelError, setIsLabelError] = useState(false)

  const showLabelError = () => setIsLabelError(() => true)
  const clearLabelError = () => setIsLabelError(() => false)

  const LabelErrorComponent = ({
    message,
    color,
  }: {
    message: string
    color?: TypographyProps["color"]
  }) => {
    return (
      <Typography variant="caption" color={color ?? "error"}>
        {isLabelError && message}
      </Typography>
    )
  }

  return {
    isLabelError,
    showLabelError,
    clearLabelError,
    LabelErrorComponent,
  }
}

export default useLabelError
