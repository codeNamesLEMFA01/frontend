import { useRef } from "react"

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import { blueGrey } from "@mui/material/colors"

import useDiversity from "@components/DiversityComponent/hooks/useDiversity.tsx"
import { CheckboxFemale, CheckboxMale } from "@components/common/Checkboxes.tsx"
import { TypoNumber } from "@components/common/Typo.tsx"
import { Diversity2 } from "@mui/icons-material"
import { IInfo } from "@services/types/diversity.type.ts"

import { AnchorEnum } from "@src/types/common"

import SliderDateRange from "../common/SliderDateRange/SliderDateRange"
import ResponsivePlot from "../graphs/ResponsivePlot"
import SectionLayout from "../layout/SectionLayout"

const DiversityComponent = () => {
  const {
    diversities,
    data,
    handleChangeDateRange,
    START_DATE,
    END_DATE,
    OPTIONS,
    handleChangeGenderGraph,
    typeGraph,
    handleChangeGraphFilter,
    filterGraph,
    DATE_RANGE,
    dateQueryParams,
    stateRequest,
  } = useDiversity()

  const checkBoxRefFemale = useRef<HTMLButtonElement>(null)
  const checkBoxRefMale = useRef<HTMLButtonElement>(null)

  return (
    <SectionLayout
      id={AnchorEnum.SECT_DIVERSITY}
      bglight
      title="Diversité"
      titleIcon={<Diversity2 sx={{ fontSize: "inherit", color: "orange" }} />}
      subtitle="Mesure de la diversité des prénoms"
      subDescription="Évaluation de la diversité des prénoms au fil du temps."
      data={data}
      stateSnackbar={stateRequest}
      componentLeft={
        <Box>
          <FormControl fullWidth>
            <InputLabel id="diversity-select-label">Diversity</InputLabel>
            <Select
              labelId="diversity-select-label"
              id="diversity-select"
              value={typeGraph}
              label="Birthday"
              onChange={handleChangeGenderGraph}
              sx={{ bgcolor: "common.white" }}
            >
              <MenuItem value={OPTIONS.total}>{OPTIONS.total}</MenuItem>
              <MenuItem value={OPTIONS.sex}>{OPTIONS.sex}</MenuItem>
            </Select>
            <>
              {typeGraph === OPTIONS.sex && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  my={2}
                >
                  <Tooltip title="Naissances chez les femmes" arrow>
                    <CheckboxFemale
                      checked={!filterGraph}
                      onChange={handleChangeGraphFilter}
                      ref={checkBoxRefFemale}
                    />
                  </Tooltip>
                  <Tooltip title="Naissances chez les hommes" arrow>
                    <CheckboxMale
                      checked={filterGraph}
                      onChange={handleChangeGraphFilter}
                      ref={checkBoxRefMale}
                    />
                  </Tooltip>
                </Stack>
              )}
            </>
          </FormControl>
          {diversities?.info.max_diversity_year && (
            <InfoComponent info={diversities?.info} />
          )}
        </Box>
      }
    >
      <Box>
        <ResponsivePlot
          data={data}
          layout={{
            title: `Diversité des prénoms`,
            xaxis: { title: "Année" },
            yaxis: { title: "Valeur" },
          }}
        />
        <Box pb={6} px={6}>
          <SliderDateRange
            dateRange={DATE_RANGE}
            startDate={START_DATE}
            endDate={END_DATE}
            value={[dateQueryParams.startYear, dateQueryParams.endYear]}
            handleChangeDateRange={handleChangeDateRange}
            sliderSx={{
              color:
                typeGraph === OPTIONS.total
                  ? blueGrey[500]
                  : !filterGraph
                    ? "female.main"
                    : "male.main",
            }}
          />
        </Box>
      </Box>
    </SectionLayout>
  )
}

export default DiversityComponent

const InfoComponent = ({ info }: { info: IInfo }) => {
  const { max_diversity_year, max_diversity_count } = info
  return (
    <Box p={2}>
      <Typography>
        La diversité des prénoms attribués aux nouveau-nés a considérablement évolué
        au fil des années, avec un pic de variété observé en{" "}
        <TypoNumber number={max_diversity_year} fontWeight={700} /> avec{" "}
        <TypoNumber number={max_diversity_count} color={"info.main"} /> prénoms
      </Typography>
    </Box>
  )
}
