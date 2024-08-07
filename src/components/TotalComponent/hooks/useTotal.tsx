import { useEffect, useRef, useState } from "react"

import { SelectChangeEvent } from "@mui/material"

import { getTotalBySex } from "@src/services/api/names.services"
import { useQuery } from "@tanstack/react-query"

interface IgraphData {
  x: string[]
  yM: number[]
  yF: number[]
  yT: number[]
}

enum OPTIONS {
  total = "Totalités des naissances",
  sex = "Totalite des naissances par genre",
}

export interface IInfo {
  total: {
    max: number
    year: string
  }
  sex: {
    male: {
      max: number
      year: string
    }
    female: {
      max: number
      year: string
    }
  }
}

const useTotal = () => {
  const { data: names } = useQuery({
    queryKey: ["names"],
    queryFn: async () => await getTotalBySex(),
    retry: false,
    staleTime: Infinity,
  })
  const [data, setData] = useState<IgraphData>()
  const [typeGraph, setTypeGraph] = useState<OPTIONS>(OPTIONS.total)
  const birthInfo = useRef<IInfo>()

  function handleChangeBirthdayGraph(e: SelectChangeEvent<OPTIONS>) {
    setTypeGraph(e.target.value as OPTIONS)
  }

  useEffect(() => {
    if (!names) return
    if (data) return
    const obj: IgraphData = { x: [], yM: [], yF: [], yT: [] }
    const graphData = Object.entries(names.data).reduce((acc, [key, value]) => {
      acc.yM.push(value.M)
      acc.yF.push(value.F)
      acc.yT.push(value.total)
      acc.x.push(key)
      return acc
    }, obj)
    setData(graphData)
    const info = {
      total: {
        max: Math.max(...graphData.yT),
        year: graphData.x[graphData.yT.indexOf(Math.max(...graphData.yT))],
      },
      sex: {
        male: {
          max: Math.max(...graphData.yM),
          year: graphData.x[graphData.yM.indexOf(Math.max(...graphData.yM))],
        },
        female: {
          max: Math.max(...graphData.yF),
          year: graphData.x[graphData.yF.indexOf(Math.max(...graphData.yF))],
        },
      },
    }
    birthInfo.current = info
  }, [names, data])
  return {
    data,
    typeGraph,
    handleChangeBirthdayGraph,
    birthInfo,
    OPTIONS,
  }
}

export default useTotal
