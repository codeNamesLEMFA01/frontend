import { Box, Stack, Typography } from "@mui/material"

// import bg from "@assets/hero.medium.jpg"
import bg from "@assets/bb_amer-flag.webp"

// import logo from "@assets/logo.png"

const Hero = () => {
  return (
    <Stack
      id="hero"
      width={"100vw"}
      sx={{
        aspectRatio: { xs: "4/3", md: "6/3", lg: "7/3" },
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <Box
        component={"img"}
        src={bg}
        alt=""
        width={"100%"}
        height={"100%"}
        sx={{
          position: "absolute",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -1,
          filter: "blur(5px) grayscale(.5)",
        }}
      />

      <Stack p={4} direction="row" alignItems="center" justifyContent="center">
        {/* <Box
          component={"img"}
          alt=""
          src={logo}
          width={"10vw"}
          mt={10}
          sx={{ filter: "grayscale(.5) brightness(.8)" }}
        /> */}
      </Stack>

      <Stack>
        <Typography
          component={"a"}
          href={
            "https://unsplash.com/fr/photos/photo-en-niveaux-de-gris-des-pieds-dune-personne-xtt_qBVbx6w"
          }
          color={"common.white"}
          fontSize={12}
          textAlign={"end"}
          sx={{
            opacity: 0.5,
            textDecoration: "none",
            "&:hover": { opacity: 1, transition: "0.3s" },
            transition: "0.3s",
          }}
          target={"_blank"}
        >
          Source: Ryan Graybill Unsplash©
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Hero
