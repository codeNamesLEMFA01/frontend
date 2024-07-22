import { Box } from "@mui/material"

import TotalComponent from "./components/TotalComponent/TotalComponent"
import TrendsByNameComponent from "./components/TrendsComponent/TrendsByNameComponent/TrendsByNameComponent"
import TrendsLengthNameComponent from "./components/TrendsComponent/TrendsLengthNameComponent/TrendsLengthNameComponent"
import TrendsTopNamesComponent from "./components/TrendsComponent/TrendsTopNamesComponent/TrendsTopNamesComponent"
import Hero from "./components/hero/Hero"

function App() {
  const { data: names } = useQuery({
    queryKey: ["names"],
    queryFn: async () => await getTotalBySex(),
    retry: false,
    staleTime: Infinity,
  })
  const [data, setData] = useState<IObjAcc>()

  useEffect(() => {
    if (!names) return
    const obj: IObjAcc = { x: [], yM: [], yF: [] }
    const data = Object.entries(names.data).reduce((acc, [key, value]) => {
      acc.yM.push(value.M)
      acc.yF.push(value.F)
      acc.x.push(key)
      return acc
    }, obj)
    console.log("🆘 DATA", data)
    setData(data)
  }, [names])

  return (
    <Box>
      <Hero />
      <TotalComponent />
      <TrendsByNameComponent />
      <TrendsTopNamesComponent />
      <TrendsLengthNameComponent />
    </Box>
  )
}

export default App
