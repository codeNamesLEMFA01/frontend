import { ChangeEvent, useEffect, useState } from "react"

import { getTrendsByName } from "@src/services/api/trends.services"
import { IServiceTrendsName } from "@src/services/types/trends.type"
import { useQuery } from "@tanstack/react-query"

interface IData extends Omit<IServiceTrendsName, "data"> {
  graphData: { x: string[]; yM: number[]; yF: number[]; yT: number[] }
}

// TODO: get names from API
const NAMES = ["Tyler", "Jose", "Cristian", "John", "Chris", "Ana", "Marie"]

const useTrendsName = () => {
  const [selectedName, setSelectedName] = useState(NAMES[0])
  const { data: trends, refetch } = useQuery({
    queryKey: ["trend name", selectedName],
    queryFn: async () => await getTrendsByName(selectedName),
    retry: false,
    staleTime: Infinity,
  })

  const [data, setData] = useState<IData>()
  const [filterGraph, setFilterGraph] = useState<{ [key: string]: boolean }>({
    female: true,
    male: true,
    total: false,
  })

  function handleChangeName(value: string | null) {
    if (!value) return
    setSelectedName(value)
    refetch()
  }

  function handleChangeGraphFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilterGraph((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }))
  }

  useEffect(() => {
    if (!trends) return
    if (trends.name === data?.name) return
    const trendsClone: Omit<IServiceTrendsName, "data"> &
      Partial<Pick<IServiceTrendsName, "data">> = structuredClone(trends)
    delete trendsClone?.data

    const obj: IData["graphData"] = { x: [], yM: [], yF: [], yT: [] }
    const graphData = Object.entries(trends.data).reduce((acc, [key, value]) => {
      acc.x.push(key)
      acc.yM.push(value.M)
      acc.yF.push(value.F)
      acc.yT.push(value.T)
      return acc
    }, obj)
    setData(() => ({
      graphData,
      ...trendsClone,
    }))
  }, [data, trends])
  return {
    data,
    NAMES,
    selectedName,
    handleChangeName,
    filterGraph,
    handleChangeGraphFilter,
  }
}

export default useTrendsName
