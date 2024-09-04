import { Box, Stack, Typography } from "@mui/material"

// import bg from "@assets/hero.medium.jpg"
import bg from "@assets/bb_amer-flag.webp"
import logo from "@assets/logo.png"
import { ChildFriendlyOutlined, WorkspacePremium } from "@mui/icons-material"

import { numberWithSpaces } from "@src/utils/numberFormat"

import useHeroInfo from "./hooks/useHeroInfo"

const STYLE = {
  fontSize: { xs: 12, md: 18 },
  fontWeight: { xs: 400, md: 600 },
}

const Hero = () => {
  const { infos } = useHeroInfo()

  return (
    <Stack
      id="hero"
      sx={{
        aspectRatio: { xs: "4/3", md: "6/3", lg: "7/3" },
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      {/* //* BACKGROUND */}
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
          filter: "blur(7px) grayscale(.5) brightness(50%)",
        }}
      />
      {/* // BACKGROUND END*/}

      {/* //* CENTER INFOS */}
      <Stack
        p={{ xs: 0, md: 4 }}
        px={{ xs: 2, md: 0 }}
        flex={1}
        color="light.main"
        maxWidth={{ xs: "90vw", md: "50%" }}
        mx={"auto"}
        mb={{ xs: 0, md: "3vh" }}
        mt="8vh"
        textAlign="center"
        gap={{ xs: 2, md: 8 }}
      >
        <Typography
          variant="h1"
          textTransform="uppercase"
          fontWeight={800}
          letterSpacing={3}
          fontFamily="Montserrat"
          alignItems="center"
          display="flex"
          justifyContent="center"
          fontSize={{ xs: 24, md: 36 }}
        >
          code
          <Box component="img" src={logo} width="clamp(50px, 10vw, 200px)" />
          names
        </Typography>
        <Typography
          fontWeight={STYLE.fontWeight}
          letterSpacing={1.5}
          fontFamily="Montserrat"
          fontSize={STYLE.fontSize}
        >
          L'administration américaine de la sécurité sociale (USSSA ou SSA) a rendu
          publiques les données sur la fréquence des prénoms attribués aux bébés
          depuis 1880 jusqu'en 2018.
        </Typography>

        <Stack
          sx={{ fontFamily: "Montserrat" }}
          direction="row"
          gap={{ xs: 2, md: 10 }}
          mt={{ xs: 3, md: "auto" }}
          alignSelf="center"
          flexWrap="wrap"
        >
          <Info
            number={infos?.total_births || 0}
            txt={"naissances"}
            icon={<ChildFriendlyOutlined sx={STYLE.fontSize} />}
          />
          <Info
            number={infos?.top_male_name.total_births || 0}
            txt={infos?.top_male_name.name || "     "}
            icon={<WorkspacePremium sx={STYLE.fontSize} />}
            color="male.dark"
          />
          <Info
            number={infos?.top_female_name.total_births || 0}
            txt={infos?.top_female_name.name || "     "}
            icon={<WorkspacePremium sx={STYLE.fontSize} />}
            color="female.dark"
          />
        </Stack>
      </Stack>
      {/* // CENTER INFOS END */}

      {/* //* FOOTER */}
      <Stack px={3} py={1}>
        <Typography
          variant="body2"
          color={"common.white"}
          textAlign={"end"}
          fontSize={{ xs: 10, md: 14 }}
          sx={{
            opacity: 0.5,
            textDecoration: "none",
            "&:hover": { opacity: 1, transition: "0.3s" },
            transition: "0.3s",
          }}
        >
          Image générée par IA
        </Typography>
      </Stack>
      {/* // FOOTER END */}
    </Stack>
  )
}

export default Hero

interface IInfo {
  number: number
  txt: string
  icon: JSX.Element
  color?: string
}
const Info = ({ number, txt, icon, color }: IInfo) => {
  return (
    <Box
      sx={{
        borderLeftColor: color ? color : "light.main",
        borderLeftStyle: "solid",
        borderLeftWidth: { xs: 2, md: 4 },
      }}
      color={"light.main"}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={{ xs: 1, md: 2 }}
        px={{ xs: 1, md: 2 }}
        py={0.5}
      >
        {icon}
        <Box>
          <Typography
            fontFamily="Montserrat"
            fontWeight={STYLE.fontWeight}
            fontSize={STYLE.fontSize}
          >
            {numberWithSpaces(number)}
          </Typography>
          <Typography
            textTransform="capitalize"
            letterSpacing={2}
            fontFamily="Montserrat"
            fontWeight={STYLE.fontWeight}
            fontSize={STYLE.fontSize}
          >
            {txt}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
