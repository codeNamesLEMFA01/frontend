import { Box } from "@mui/material"

import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import Hero from "./components/hero/Hero"

function App() {
  return (
    <Box>
      <Hero />
      <TotalComponent />
      <TrendsByNameComponent />
      <TrendsTopNamesComponent />
    </Box>
  )
}

export default App
