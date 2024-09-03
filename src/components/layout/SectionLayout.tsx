import { PropsWithChildren, useEffect, useState } from "react"

import {
  Alert,
  Box,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"

import { useDebouncedCallback } from "use-debounce"

interface ISectionLayout<T> extends IState {
  id?: string
  title?: string
  titleIcon?: JSX.Element
  subtitle?: string
  subtitleIcon?: JSX.Element
  description?: string | JSX.Element
  subDescription?: string | JSX.Element
  bglight?: boolean
  data: T
  componentLeft: JSX.Element
}

interface IState {
  stateSnackbar?: {
    isFetching: boolean
    isError: boolean
    errorMessage?: string
    isFetched: boolean
  }
}

const HEIGHT = 350
const SectionLayout = <T,>({
  id,
  bglight,
  title,
  titleIcon,
  subtitle,
  subtitleIcon,
  description,
  subDescription,
  componentLeft,
  data,
  children,
  stateSnackbar,
}: PropsWithChildren<ISectionLayout<T>>) => {
  const [stateError, setStateError] = useState(false)
  const [stateFetching, setStateFetching] = useState(false)
  const bgcolor = bglight ? "section.light" : "section.dark"

  const test = useDebouncedCallback(() => {
    if (stateSnackbar?.isFetching) setStateFetching(stateSnackbar.isFetching)
  }, 300)

  useEffect(() => {
    if (!stateSnackbar?.isFetching) setStateFetching(false)
    if (
      stateSnackbar?.isError &&
      (stateSnackbar.isFetched || stateSnackbar.isFetching)
    )
      setStateError(() => true)
    test()
  }, [stateSnackbar, test])

  return (
    <Stack
      bgcolor={bgcolor}
      p={4}
      sx={{ position: "relative", scrollBehavior: "smooth" }}
      id={"anchor_" + id}
    >
      <Box mb={1}>
        <Grid container mb={3}>
          <Grid item xs={0} md={2} />
          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              fontSize={{ xs: 28, md: 32 }}
              fontWeight={700}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {titleIcon}
              {title}
            </Typography>
            {description}
          </Grid>
          <Grid item xs={0} md={3} />
        </Grid>
        <Typography
          variant="h3"
          fontSize={{ xs: 18, md: 20 }}
          fontWeight={600}
          sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
        >
          {subtitleIcon}
          {subtitle}
        </Typography>
        {subDescription}
      </Box>

      <Grid container>
        <Grid item xs={12} md={3}>
          {componentLeft}
        </Grid>
        <Grid item xs={12} md={9} minHeight={`${HEIGHT}px`} pl={{ md: 6 }}>
          {data && children ? children : <LoadingSkeleton />}
        </Grid>
      </Grid>
      <Snackbar
        open={stateFetching}
        // autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ position: "absolute" }}
        // onClose={() => setStateFetching(false)}
      >
        {stateFetching ? (
          <Alert severity="info" variant="filled">
            Chargement en cours...
          </Alert>
        ) : (
          <Box />
        )}
      </Snackbar>
      <Snackbar
        open={stateError}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ position: "absolute" }}
        onClose={() => setStateError(false)}
      >
        {stateSnackbar?.isError ? (
          <Alert severity="error" variant="filled">
            {stateSnackbar.errorMessage || "Une erreur s'est produite..."}
          </Alert>
        ) : (
          <Box />
        )}
      </Snackbar>
    </Stack>
  )
}

export default SectionLayout

const LoadingSkeleton = () => {
  return (
    <Skeleton variant="rectangular" height={HEIGHT} width={"100%"} sx={{ p: 4 }} />
  )
}
