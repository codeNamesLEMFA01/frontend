import { Suspense, useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"

import { getTotalBySex } from "@src/services/api/names.services"
import { useQuery } from "@tanstack/react-query"
import Plot from "react-plotly.js"

import "./App.css"

interface IObjAcc {
  x: string[]
  yM: number[]
  yF: number[]
}

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
      <Typography variant="h1">Code names!</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <Plot
          data={[
            {
              type: "bar",
              x: data?.x,
              y: data?.yM,
              name: "Male",
              marker: { color: "118ab2" },
            },
            {
              type: "bar",
              x: data?.x,
              y: data?.yF,
              name: "Female",
              marker: { color: "ef476f" },
            },
          ]}
          layout={{
            title: "Total by sex",
          }}
          style={{ width: "100%" }}
        />
      </Suspense>
    </Box>
  )
}

export default App
