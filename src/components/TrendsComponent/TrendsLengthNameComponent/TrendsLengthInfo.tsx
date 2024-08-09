import { Box, Stack, Typography } from "@mui/material"

import {
  IDescribeLengthData,
  IMaxLengthData,
  ITrendsLengthNameService,
} from "@src/services/types/trends.type"

import { TypoName, TypoNumber } from "@src/components/common/Typo"

const FIXED = 2
const TrendsLengthInfo = ({
  info,
  isViolonPlot,
  isFemale,
}: {
  info: ITrendsLengthNameService["meta"]
  isViolonPlot: boolean
  isFemale: boolean
}) => {
  return (
    <Box>
      {!isViolonPlot ? (
        <InfoComponentEvolution evolution={info.evolution} />
      ) : (
        <InfoComponentViolin
          isFemale={isFemale}
          gender={isFemale ? info.describe.female : info.describe.male}
          genderFunFact={isFemale ? info.max.female : info.max.male}
        />
      )}
    </Box>
  )
}
export default TrendsLengthInfo

const InfoComponentEvolution = ({
  evolution,
}: {
  evolution: ITrendsLengthNameService["meta"]["evolution"]
}) => {
  const wordEvolution = (isPositive: boolean) =>
    isPositive ? "augmentée" : "diminuée"
  return (
    <Stack spacing={2}>
      <Typography>
        La longueur des noms pour les femmes à{" "}
        <Typography component="span" fontStyle="italic" fontWeight={300}>
          {wordEvolution(evolution.female > 0)}
        </Typography>{" "}
        d'environ{" "}
        <TypoNumber
          number={evolution.female.toFixed(FIXED)}
          fontWeight={700}
          color={"female.main"}
          isPercent
        />
        et pour les hommes elle a{" "}
        <Typography component="span" fontStyle="italic" fontWeight={300}>
          {wordEvolution(evolution.male > 0)}
        </Typography>{" "}
        d'environ{" "}
        <TypoNumber
          number={evolution.male.toFixed(FIXED)}
          fontWeight={700}
          color={"male.main"}
          isPercent
        />
        .
      </Typography>
      <Typography>
        Finalement l'évolution de la longueur des noms à{" "}
        <Typography component="span" fontStyle="italic" fontWeight={300}>
          {wordEvolution(evolution.global > 0)}
        </Typography>{" "}
        d'environ{" "}
        <TypoNumber
          number={evolution.global.toFixed(FIXED)}
          isPercent
          fontWeight={700}
        />
      </Typography>
    </Stack>
  )
}

const InfoComponentViolin = ({
  isFemale,
  gender,
  genderFunFact,
}: {
  isFemale: boolean
  gender: IDescribeLengthData
  genderFunFact: IMaxLengthData
}) => {
  return (
    <Stack spacing={2}>
      <Box>
        <Typography sx={{ textDecoration: "underline" }}>
          Ce qu'il faut retenir :{" "}
        </Typography>
        <Typography>
          L'écart-type de{" "}
          <TypoNumber number={gender.std} fontWeight={700} isPercent /> reflète la
          variation de ces moyennes annuelles au fil du temps.
        </Typography>
      </Box>
      <FunFactViolin gender={genderFunFact} isFemale={isFemale} />
      {/* <Typography>
        Sur l'ensemble de la période étudiée, la longueur moyenne annuelle des
        prénoms {isFemale ? "feminins" : "masculins"} est typiquement de{" "}
        <TypoNumber number={gender.mean} fontWeight={700} isPercent /> caractères,
        avec 50% des années ayant une moyenne entre{" "}
        <TypoNumber number={gender["25%"]} fontWeight={700} isPercent /> et{" "}
        <TypoNumber number={gender["75%"]} fontWeight={700} isPercent /> caractères.
        L'écart-type de <TypoNumber number={gender.std} fontWeight={700} isPercent />{" "}
        reflète la variation de ces moyennes annuelles au fil du temps.
      </Typography> */}
    </Stack>
  )
}

const FunFactViolin = ({
  gender,
  isFemale,
}: {
  gender: IMaxLengthData
  isFemale: boolean
}) => {
  return (
    <Stack>
      <Typography sx={{ textDecoration: "underline" }}>Fun fact : </Typography>
      <Typography>
        le nom le plus long pour les {isFemale ? "femmes" : "hommes"} est:{" "}
      </Typography>
      <Typography>
        <TypoName color={isFemale ? "female.main" : "male.main"}>
          {gender.name}
        </TypoName>{" "}
        avec <TypoNumber number={gender.name_length} fontWeight={700} /> caractères.
      </Typography>
      <Typography>
        Il a été donné pour la première fois en{" "}
        <TypoNumber number={gender.year} fontWeight={700} /> à{" "}
        <TypoNumber number={gender.birth} fontWeight={700} /> personnes différentes.
      </Typography>
    </Stack>
  )
}
