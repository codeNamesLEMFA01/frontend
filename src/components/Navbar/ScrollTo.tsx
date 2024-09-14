import React, { useEffect } from "react"

import { useTheme } from "@mui/material/styles"

import { useScrollTrigger } from "@mui/material"

interface ScrollHandlerProps {
  window?: () => Window
  threshold?: number
  shadow?: number
  color?: {
    in: string
    out: string
  }
  refElement?: React.RefObject<HTMLElement>
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

  useEffect(() => {
    if (!props.refElement?.current) return
    const element = props.refElement.current
    const { style } = element
    style.opacity = trigger ? "1" : "0"
  }, [props.refElement, trigger])

  return React.cloneElement(props.children, {
    style: {
      background: trigger
        ? theme.palette.primary.main
        : "linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0) 100%)",
      color: trigger ? props.color?.in || "white" : props.color?.out || "black",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: trigger ? shadow : "none",
    },
  })
}

const ScrollTo = (props: ScrollHandlerProps) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>
}

export default ScrollTo
