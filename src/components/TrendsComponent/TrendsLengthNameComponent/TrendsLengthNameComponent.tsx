import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material"

import { customPalette } from "@src/theme/const/customPalette"

import { GroupFormControlLabelCheckboxesMaleAndFemale } from "@src/components/common/Checkboxes"
import ResponsivePlot from "@src/components/graphs/ResponsivePlot"
import SectionLayout from "@src/components/layout/SectionLayout"

import TrendsLengthInfo from "./TrendsLengthInfo"
import useTrendsLengthName from "./hooks/useTrendsLengthName"

const TrendsLengthNameComponent = () => {
  const {
    trendsLengthName,
    graphData,
    setIsViolonPlot,
    isViolonPlot,
    isFemale,
    setIsFemale,
  } = useTrendsLengthName()

  return (
    <SectionLayout
      bglight
      subtitle="Longeur des noms"
      subDescription="Analyse de la longueur des noms au travers des annés"
      data={trendsLengthName}
      componentLeft={
        <Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isViolonPlot}
                  onChange={(e) => setIsViolonPlot(e.target.checked)}
                />
              }
              label="Voir la répartition de la longueur des noms"
              sx={{ fontSize: 8 }}
            />
            <GroupFormControlLabelCheckboxesMaleAndFemale
              checked={isFemale}
              onChange={() => setIsFemale(!isFemale)}
              disabled={!isViolonPlot}
              name="length"
            />
          </FormGroup>
          {trendsLengthName && (
            <TrendsLengthInfo
              info={trendsLengthName.meta}
              isViolonPlot={isViolonPlot}
              isFemale={isFemale}
            />
          )}
        </Box>
      }
    >
      {graphData.female && graphData.male && (
        <ResponsivePlot
          data={[
            {
              ...(isViolonPlot
                ? {
                    x: isFemale ? graphData.female.length : graphData.male.length,
                    type: "violin",
                    box: { visible: true },
                    boxpoints: false,
                    line: {
                      color: isFemale
                        ? customPalette.female.dark
                        : customPalette.male.dark,
                    },
                    fillcolor: isFemale
                      ? customPalette.female.light
                      : customPalette.male.light,
                    opacity: 0.5,
                    y0: isFemale ? "Femmes" : "Hommes",
                  }
                : {
                    x: graphData.female.years,
                    y: graphData.female.length,
                    name: "Femmes",
                    marker: { color: customPalette.female.main },
                  }),
            },
            isViolonPlot
              ? {}
              : {
                  y: graphData.male.length,
                  x: graphData.male.years,
                  name: "Hommes",
                  marker: { color: customPalette.male.main },
                },
          ]}
          layout={{
            title: graphData.title,
            ...(isViolonPlot && {
              yaxis: {
                zeroline: false,
              },
            }),
          }}
        />
      )}
    </SectionLayout>
  )
}

export default TrendsLengthNameComponent
