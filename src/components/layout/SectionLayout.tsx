import { PropsWithChildren } from "react"

import {
  Alert,
  Box,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"

interface ISectionLayout<T> extends IState {
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
  isFetching?: boolean
  isError?: boolean
}

const HEIGHT = 350
const SectionLayout = <T,>({
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
  isFetching,
  isError,
}: PropsWithChildren<ISectionLayout<T>>) => {
  const bgcolor = bglight ? "section.light" : "section.dark"
  return (
    <Stack bgcolor={bgcolor} p={4} sx={{ position: "relative" }}>
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
        open={!!isFetching}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ position: "absolute" }}
      >
        {isFetching ? (
          <Alert severity="info" variant="filled">
            Chargement en cours...
          </Alert>
        ) : (
          <Box />
        )}
      </Snackbar>
      <Snackbar
        open={!!isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ position: "absolute" }}
      >
        {isError ? (
          <Alert severity="error" variant="filled">
            Une erreur s'est produite...
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
