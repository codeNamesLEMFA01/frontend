import React from "react"

import { useTheme } from "@mui/material/styles"

import { useScrollTrigger } from "@mui/material"

interface ScrollHandlerProps {
  window?: () => Window
  threshold?: number
  shadow?: number
  children: React.ReactElement
}

const ScrollHandler = (props: ScrollHandlerProps) => {
  const theme = useTheme()
  const shadow = theme.shadows[props.shadow || 4]
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold || 0,
    target: props.window ? props.window() : undefined,
  })

  return React.cloneElement(props.children, {
    style: {
      backgroundColor: trigger ? "#0B4678" : "transparent",
      color: trigger ? "white" : "black",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: trigger ? shadow : "none",
    },
  })
}

const ScrollTo = (props: ScrollHandlerProps) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>
}

export default ScrollTo
