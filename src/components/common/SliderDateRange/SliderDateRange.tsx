import { Box, Slider, SliderProps, Typography } from "@mui/material"

interface IProps {
  dateRange: {
    value: number
    label: string
  }[]
  startDate: number
  endDate: number
  handleChangeDateRange: SliderProps["onChange"]
  sliderSx: SliderProps["sx"]
  value: [number, number]
  message?: string
}
const SliderDateRange = ({
  dateRange,
  startDate,
  endDate,
  handleChangeDateRange,
  sliderSx,
  value,
  message,
}: IProps) => {
  return (
    <Box pb={6} px={6}>
      <Slider
        marks={dateRange}
        min={startDate}
        max={endDate}
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChangeDateRange}
        valueLabelDisplay="auto"
        getAriaValueText={() => `toto`}
        sx={sliderSx}
      />
      <Typography variant="body2" textAlign="center">
        Choix de la période à consulter
      </Typography>
      <Typography variant="body2" textAlign="center">
        {message}
      </Typography>
    </Box>
  )
}

export default SliderDateRange
