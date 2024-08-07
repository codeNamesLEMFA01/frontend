import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"

import CakeIcon from "@mui/icons-material/Cake"
import { customPalette } from "@src/theme/const/customPalette"

import { TypoNumber } from "../common/Typo"
import ResponsivePlot from "../graphs/ResponsivePlot"
import SectionLayout from "../layout/SectionLayout"
import useTotal, { IInfo } from "./hooks/useTotal"

const TotalComponent = () => {
  const { OPTIONS, birthInfo, data, handleChangeBirthdayGraph, typeGraph } =
    useTotal()

  return (
    <SectionLayout
      bglight
      title="Totalite des naissances"
      titleIcon={
        <CakeIcon sx={{ fontSize: "inherit", color: customPalette.female.dark }} />
      }
      description="Évolution de la distribution des naissances par genre et par annees"
      data={data}
      componentLeft={
        <Box>
          <FormControl fullWidth>
            <InputLabel id="birthday-select-label">Birthday</InputLabel>
            <Select
              labelId="birthday-select-label"
              id="birthday-select"
              value={typeGraph}
              label="Birthday"
              onChange={handleChangeBirthdayGraph}
              sx={{ bgcolor: "common.white" }}
            >
              <MenuItem value={OPTIONS.total}>{OPTIONS.total}</MenuItem>
              <MenuItem value={OPTIONS.sex}>{OPTIONS.sex}</MenuItem>
            </Select>
          </FormControl>
          {birthInfo.current && (
            <InfoComponent
              info={birthInfo.current}
              isTotal={typeGraph === OPTIONS.total}
            />
          )}
        </Box>
      }
    >
      {typeGraph === OPTIONS.total ? (
        <ResponsivePlot
          data={[{ x: data?.x, y: data?.yT }]}
          layout={{ title: OPTIONS.total }}
        />
      ) : (
        <ResponsivePlot
          data={[
            {
              x: data?.x,
              y: data?.yM,
              name: "Male",
              marker: { color: customPalette.male.main },
            },
            {
              x: data?.x,
              y: data?.yF,
              name: "Female",
              marker: { color: customPalette.female.main },
            },
          ]}
          layout={{ title: OPTIONS.sex }}
        />
      )}
    </SectionLayout>
  )
}

export default TotalComponent

const InfoComponent = ({ info, isTotal }: { info: IInfo; isTotal: boolean }) => {
  const {
    total,
    sex: { male, female },
  } = info
  return (
    <Box p={2}>
      {/* //TODO: In waiting for API */}
      {isTotal ? (
        <Typography>
          La distribution total des naissances est la suivante avec un pic en{" "}
          <TypoNumber number={total.year} fontWeight={700} /> avec{" "}
          {<TypoNumber number={total.max} color={"info.main"} />} naissances
        </Typography>
      ) : (
        <Typography>
          La distribution des naissances par genre est la suivante avec un pic en{" "}
          <TypoNumber number={male.year} fontWeight={700} /> avec{" "}
          <TypoNumber number={male.max} color={"male.main"} /> naissances chez les
          hommes un pic en <TypoNumber number={female.year} fontWeight={700} /> avec{" "}
          <TypoNumber number={female.max} color={"female.main"} /> naissances chez
          les femmes
        </Typography>
      )}
    </Box>
  )
}
