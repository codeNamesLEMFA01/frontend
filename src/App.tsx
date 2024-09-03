import { Box } from "@mui/material"

import DiversityComponent from "@components/DiversityComponent/DiversityComponent.tsx"

import Navbar from "./components/Navbar/Navbar"
import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsLengthNameComponent from "./components/TrendsComponent/TrendsLengthNameComponent/TrendsLengthNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import AuthHOC from "./components/auth/AuthHOC"
import Hero from "./components/hero/Hero"

function App() {
  return (
    <AuthHOC>
      <Box id="anchor_top">
        <Navbar />
        <Hero />
        <TotalComponent />
        <TrendsByNameComponent />
        <TrendsTopNamesComponent />
        <TrendsLengthNameComponent />
        <DiversityComponent />
      </Box>
    </AuthHOC>
  )
}

export default App
