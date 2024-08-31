import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Slider, Stack, Tooltip,
    Typography,
} from "@mui/material"
import ResponsivePlot from "../graphs/ResponsivePlot"
import SectionLayout from "../layout/SectionLayout"
import useDiversity from "@components/DiversityComponent/hooks/useDiversity.tsx";
import {useRef} from "react";
import {CheckboxFemale, CheckboxMale} from "@components/common/Checkboxes.tsx";
import {TypoNumber} from "@components/common/Typo.tsx";
import {IInfo} from "@services/types/diversity.type.ts";


const DiversityComponent = () => {
    const {diversities,inputQueryParams, data,handleChangeDateRange , START_DATE, END_DATE, OPTIONS, handleChangeGenderGraph, typeGraph, handleChangeGraphFilter, filterGraph} = useDiversity()
    const checkBoxRefFemale = useRef<HTMLButtonElement>(null)
    const checkBoxRefMale = useRef<HTMLButtonElement>(null)

    return (
        <SectionLayout data={[]} componentLeft={
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
                        { typeGraph === OPTIONS.sex &&
                            <Stack direction="row" alignItems="center" justifyContent="center" my={2}>
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
                        }
                    </>
                </FormControl>
                {diversities?.info.max_diversity_year && (
                    <InfoComponent
                        info={diversities?.info}
                    />
                )}
        </Box>
        }>
            <Box>
                <ResponsivePlot
                    data={data}
                    layout={{
                        title: `Diversité des prénoms`,
                        xaxis: {title: 'Année'},
                        yaxis: {title: 'Valeur'},
                    }}
                />
                <Box pb={6} px={6}>
                    <Slider
                        marks={true}
                        min={START_DATE}
                        max={END_DATE}
                        getAriaLabel={() => "Minimum distance shift"}
                        value={[inputQueryParams.startYear, inputQueryParams.endYear]}
                        onChange={handleChangeDateRange}
                        valueLabelDisplay="auto"
                        getAriaValueText={() => `toto`}
                        sx={{color: typeGraph === OPTIONS.total ? "section.contrastText" : !filterGraph ? "female.main" : "male.main"}}
                    />
                    <Typography variant="body2" textAlign="center">
                        Choix de la période à consulter
                    </Typography>
                </Box>
            </Box>
        </SectionLayout>
    )
}

export default DiversityComponent

const InfoComponent = ({ info }: { info: IInfo; }) => {
    const {
       max_diversity_year,
        max_diversity_count
    } = info
    return (
        <Box p={2}>
            <Typography>
                La diversité des prénoms attribués aux nouveau-nés a considérablement évolué au fil des années, avec un pic de variété observé en{" "}
                <TypoNumber number={max_diversity_year} fontWeight={700} /> avec{" "}
                <TypoNumber number={max_diversity_count} color={"info.main"} /> prénoms
            </Typography>
        </Box>
    )
}