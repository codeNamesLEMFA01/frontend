import { Box, Container, Stack, Typography } from "@mui/material"

// import bg from "@assets/hero.medium.jpg"
import bg from "@assets/bb_amer-flag.webp"
import logo from "@assets/logo.png"
import { ChildFriendlyOutlined, WorkspacePremium } from "@mui/icons-material"

import useRandomIntervalNames from "@src/hooks/useRandomIntervalNames"
import useRandomIntervalNum from "@src/hooks/useRandomIntervalNum"

import { numberWithSpaces } from "@src/utils/numberFormat"

import useHeroInfo from "./hooks/useHeroInfo"

const STYLE = {
  fontSize: { txt: "clamp(12px, 1.5vw, 24px)", ico: { xs: 18, md: 24, lg: 36 } },
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
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack
          p={{ xs: 0, md: 4 }}
          px={{ xs: 2, md: 0 }}
          flex={1}
          color="light.main"
          height="80%"
          maxHeight="70vh"
          mx="auto"
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
            fontSize={"clamp(24px, 5vw, 150px)"}
          >
            code
            <Box component="img" src={logo} width="clamp(50px, 10vw, 200px)" />
            names
          </Typography>
          <Typography
            fontWeight={STYLE.fontWeight}
            letterSpacing={1.5}
            fontFamily="Montserrat"
            fontSize={STYLE.fontSize.txt}
          >
            L'administration américaine de la sécurité sociale (USSSA ou SSA) a rendu
            publiques les données sur la fréquence des prénoms attribués aux bébés
            depuis <TypoDate date="1880 " /> jusqu'en <TypoDate date="2018" />.
          </Typography>

          <Box
            display="grid"
            gridAutoFlow="column"
            gridAutoColumns="1fr"
            gap={{ xs: 2, md: 10 }}
            mt={{ xs: 3, md: "auto" }}
            alignSelf="center"
          >
            <Info
              number={infos?.total_births}
              txt="naissances"
              icon={<ChildFriendlyOutlined sx={{ fontSize: STYLE.fontSize.ico }} />}
            />
            <Info
              number={infos?.top_male_name.total_births}
              txt={infos?.top_male_name.name}
              icon={<WorkspacePremium sx={{ fontSize: STYLE.fontSize.ico }} />}
              color="male.dark"
            />
            <Info
              number={infos?.top_female_name.total_births}
              txt={infos?.top_female_name.name}
              icon={<WorkspacePremium sx={{ fontSize: STYLE.fontSize.ico }} />}
              color="female.dark"
            />
          </Box>
        </Stack>
      </Container>
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
  number?: number
  txt?: string
  icon: JSX.Element
  color?: string
}
const Info = ({ number, txt, icon, color }: IInfo) => {
  const { num } = useRandomIntervalNum({
    stopCondition: number !== undefined,
    min: 1_000_000,
    max: 999_999_999,
  })
  const { name } = useRandomIntervalNames({ stopCondition: txt !== undefined })

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
            fontSize={STYLE.fontSize.txt}
          >
            {numberWithSpaces(number ?? num)}
          </Typography>
          <Typography
            textTransform="capitalize"
            letterSpacing={2}
            fontFamily="Montserrat"
            fontWeight={STYLE.fontWeight}
            fontSize={STYLE.fontSize.txt}
          >
            {txt ?? name}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

const TypoDate = ({ date }: { date: string }) => {
  return (
    <Typography
      component="span"
      color="common.white"
      fontWeight={{ xs: 500, md: 900 }}
      fontSize="clamp(14px, 1.8vw, 28px)"
    >
      {date}
    </Typography>
  )
}
