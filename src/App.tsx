import { Box } from "@mui/material"

import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsLengthNameComponent from "./components/TrendsComponent/TrendsLengthNameComponent/TrendsLengthNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import Hero from "./components/hero/Hero"
import DiversityComponent from "@components/DiversityComponent/DiversityComponent.tsx";

function App() {
  return (
    <Box>
        <Hero />
        <TotalComponent />
        <TrendsByNameComponent />
        <TrendsTopNamesComponent />
        <TrendsLengthNameComponent />
        <DiversityComponent/>
    </Box>
  )
}

export default App
