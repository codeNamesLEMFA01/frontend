import { useTheme } from "@mui/material"

import Plot, { type PlotParams } from "react-plotly.js"

const ResponsivePlot = (props: PlotParams) => {
  const { data, layout, style, ...others } = props
  const { palette } = useTheme()
  const GRID_COLOR = {
    xaxis: { gridcolor: palette.divider },
    yaxis: { gridcolor: palette.divider },
  }
  return (
    <Plot
      data={data}
      layout={{
        autosize: true,
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        ...GRID_COLOR,
        ...layout,
      }}
      style={{ width: "100%", height: "100%", ...style }}
      useResizeHandler
      config={{ displayModeBar: true }}
      {...others}
    />
  )
}

export default ResponsivePlot
