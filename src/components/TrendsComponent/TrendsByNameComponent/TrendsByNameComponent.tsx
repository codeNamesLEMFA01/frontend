import { useRef } from "react"

import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"

import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import { customPalette } from "@src/theme/const/customPalette"

import {
  CheckboxFemale,
  CheckboxGroups,
  CheckboxMale,
} from "@src/components/common/Checkboxes"
import { TypoNumber } from "@src/components/common/Typo"

import ResponsivePlot from "../../graphs/ResponsivePlot"
import SectionLayout from "../../layout/SectionLayout"
import useTrendsName from "./hooks/useTrendsName"

const MESSAGE_ERROR = "Le nom ne peut contenir que des lettres."

const TrendsByNameComponent = () => {
  const {
    namesList,
    data,
    selectedName,
    handleChangeName,
    filterGraph,
    handleChangeGraphFilter,
    handleUpdateNamesList,
    isLabelError,
    LabelErrorComponent,
  } = useTrendsName()
  const checkBoxRefFemale = useRef<HTMLButtonElement>(null)
  const checkBoxRefMale = useRef<HTMLButtonElement>(null)
  const checkBoxRefGroups = useRef<HTMLButtonElement>(null)

  return (
    <SectionLayout
      title="Évolution"
      titleIcon={<TrendingUpIcon sx={{ fontSize: "inherit", color: "goldenrod" }} />}
      description="Dynamiques culturelles et sociales qui influencent le choix des prénoms."
      subtitle="Évolution des tendances par nom"
      subDescription="Évolution de la distribution des naissances par genre et par années"
      data={data}
      componentLeft={
        <Box>
          {namesList && selectedName && (
            <Autocomplete
              value={selectedName}
              options={namesList}
              autoHighlight
              freeSolo
              onChange={(_, newValue) => handleChangeName(newValue)}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    sx={{ bgcolor: "common.white" }}
                    InputProps={{
                      ...params.InputProps,
                      onKeyUp: (e) => handleUpdateNamesList(e),
                    }}
                    error={isLabelError}
                  />
                  <LabelErrorComponent message={MESSAGE_ERROR} color={""} />
                </>
              )}
            />
          )}
          <Stack direction="row" alignItems="center" justifyContent="center" my={2}>
            <Tooltip title="Naissances chez les femmes" arrow>
              <CheckboxFemale
                checked={filterGraph.female}
                onChange={handleChangeGraphFilter}
                ref={checkBoxRefFemale}
              />
            </Tooltip>
            <Tooltip title="Naissances chez les hommes" arrow>
              <CheckboxMale
                checked={filterGraph.male}
                onChange={handleChangeGraphFilter}
                ref={checkBoxRefMale}
              />
            </Tooltip>
            <Tooltip title="Total des naissances" arrow>
              <CheckboxGroups
                checked={filterGraph.groups}
                onChange={handleChangeGraphFilter}
                name="total"
                ref={checkBoxRefGroups}
              />
            </Tooltip>
          </Stack>
          {data ? (
            <Stack spacing={1}>
              <Typography>
                L'utilisation du prénom{" "}
                <Typography
                  component="span"
                  fontStyle="italic"
                  sx={{ textDecoration: "underline" }}
                >
                  {selectedName}
                </Typography>{" "}
                à atteint sont apogée en{" "}
                <TypoNumber number={data.max_year} fontWeight={700} /> avec{" "}
                <TypoNumber number={data.max_value} fontWeight={700} /> naissances
                sur un total de <TypoNumber number={data.total} fontWeight={700} />
                entre <TypoNumber number={1880} fontStyle="italic" /> et{" "}
                <TypoNumber number={2018} fontStyle="italic" />.
              </Typography>
              <Typography>
                <TypoNumber
                  number={data.by_gender.M}
                  fontWeight={700}
                  color="male.main"
                />
                garçon et{" "}
                <TypoNumber
                  number={data.by_gender.F}
                  fontWeight={700}
                  color="female.main"
                />
                filles sont nés durant cette période.
              </Typography>
            </Stack>
          ) : (
            <Typography align="center">
              Pas de données {selectedName ? `pour ${selectedName}` : ""}
            </Typography>
          )}
        </Box>
      }
    >
      {data && (
        <ResponsivePlot
          data={[
            filterGraph.male
              ? {
                  x: data.graphData.x,
                  y: data.graphData.yM,
                  name: "Male",
                  marker: { color: customPalette.male.main },
                }
              : {},
            filterGraph.female
              ? {
                  x: data.graphData.x,
                  y: data.graphData.yF,
                  name: "Female",
                  marker: { color: customPalette.female.main },
                }
              : {},
            filterGraph.total
              ? {
                  x: data.graphData.x,
                  y: data.graphData.yT,
                  name: "Total",
                  marker: { color: "common.black" },
                }
              : {},
          ]}
          layout={{ title: selectedName }}
        />
      )}
    </SectionLayout>
  )
}

export default TrendsByNameComponent
