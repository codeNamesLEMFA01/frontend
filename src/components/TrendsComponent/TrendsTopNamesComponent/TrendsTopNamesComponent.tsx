import { Box, Divider, Slider, TextField, Typography } from "@mui/material"

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import {
  IServiceTrendsTopNames,
  TrendsTopNamesQueryEnum,
} from "@src/services/types/trends.type"

import { GroupFormControlLabelCheckboxesMaleAndFemale } from "@src/components/common/Checkboxes"
import { TypoName, TypoNumber } from "@src/components/common/Typo"
import ResponsivePlot from "@src/components/graphs/ResponsivePlot"
import SectionLayout from "@src/components/layout/SectionLayout"

import useTrendsTopNames from "./hooks/useTrendsTopNames"

const MIN_TOP = 2

const TrendsTopNamesComponent = () => {
  const {
    trendsTopNames,
    isFemale,
    setIsFemale,
    inputQueryParams,
    handleChangeInputQueryParams,
    handleChangeDateRange,
    START_DATE,
    END_DATE,
    DATE_RANGE,
  } = useTrendsTopNames()

  return (
    <>
      <Divider />
      <SectionLayout
        title="Sur le podium"
        titleIcon={
          <EmojiEventsIcon sx={{ fontSize: "inherit", color: "goldenrod" }} />
        }
        subtitle="Top noms"
        bglight
        subDescription="Évolution des noms les plus répandus au cours des annés"
        data={trendsTopNames}
        componentLeft={
          <Box>
            <TextField
              name={TrendsTopNamesQueryEnum.TOPN}
              label="Top"
              type="number"
              sx={{ bgcolor: "common.white" }}
              size="small"
              fullWidth
              value={inputQueryParams.topN}
              onChange={(e) => handleChangeInputQueryParams(e)}
              inputProps={{ min: MIN_TOP }}
            />
            <GroupFormControlLabelCheckboxesMaleAndFemale
              checked={isFemale}
              onChange={() => setIsFemale(!isFemale)}
            />
            {trendsTopNames && <InfoComponent info={trendsTopNames.info} />}
          </Box>
        }
      >
        {trendsTopNames && (
          <Box>
            <ResponsivePlot
              data={trendsTopNames.data[isFemale ? "female" : "male"].map(
                (graph) => {
                  return {
                    x: graph.years,
                    y: graph.birth,
                    name: graph.name,
                    type: "scatter",
                    fill: "tozeroy",
                  }
                },
              )}
              layout={{
                title: `Top ${trendsTopNames.info.top_n} des noms les plus répendus pour ${isFemale ? "femmes" : "hommes"}`,
              }}
            />
            <Box pb={6} px={6}>
              <Slider
                marks={DATE_RANGE}
                min={START_DATE}
                max={END_DATE}
                getAriaLabel={() => "Minimum distance shift"}
                value={[inputQueryParams.startYear, inputQueryParams.endYear]}
                onChange={handleChangeDateRange}
                valueLabelDisplay="auto"
                getAriaValueText={() => `toto`}
                sx={{ color: isFemale ? "female.main" : "male.main" }}
              />
              <Typography variant="body2" textAlign="center">
                Choix de la période à consulter
              </Typography>
            </Box>
          </Box>
        )}
      </SectionLayout>
    </>
  )
}

export default TrendsTopNamesComponent

const InfoComponent = ({ info }: { info: IServiceTrendsTopNames["info"] }) => {
  const { end_year, start_year, top_name, top_n } = info

  return (
    <Box>
      <Typography>
        Entre <TypoNumber number={start_year} fontWeight={700} /> et{" "}
        <TypoNumber number={end_year} fontWeight={700} />, il y a eu
        <br />
        <TypoNumber number={top_name.female.total} color={"female.main"} />
        <TypoName>{top_name.female.name}</TypoName> et{" "}
        <TypoNumber number={top_name.male.total} color={"male.main"} />
        <TypoName>{top_name.male.name}</TypoName> !<br />
        Ce qui fait d'eux les prénoms les plus utilisés durant cette période.
      </Typography>
      <Typography>
        Top {top_n <= 10 ? top_n : "10"} des noms les plus répandus
      </Typography>
    </Box>
  )
}
