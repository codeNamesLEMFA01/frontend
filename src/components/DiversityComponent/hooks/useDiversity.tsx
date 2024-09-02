import { useEffect, useState } from "react"

import { SelectChangeEvent } from "@mui/material"

import { END_DATE, START_DATE } from "@constants/date.ts"
import { getDiversity } from "@services/api/diversity.services.ts"
import { IDiversity } from "@services/types/diversity.type.ts"
import { useQuery } from "@tanstack/react-query"

import useHandleChangeDate from "@src/components/common/SliderDateRange/hooks/useHandleChangeDate"

enum OPTIONS {
  total = "Totalités des naissances",
  sex = "Totalite des naissances par genre",
}

interface IData {
  z: number[][]
  x: number[]
  y: string[]
  type: "heatmap"
}

const DATE_RANGE = [
  {
    value: START_DATE,
    label: START_DATE.toString(),
  },
  {
    value: END_DATE,
    label: END_DATE.toString(),
  },
]

const useDiversity = () => {
  const { dateQueryParams, handleChangeDateRange, defineRefetch, countRef } =
    useHandleChangeDate({ startDate: START_DATE, endDate: END_DATE })

  const [data, setData] = useState<IData[]>([])
  const [typeGraph, setTypeGraph] = useState(OPTIONS.total)
  const [filterGraph, setFilterGraph] = useState<boolean>(true)
  const {
    data: diversities,
    refetch,
    isError,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["diversity"],
    queryFn: async () => await getDiversity(dateQueryParams),
    retry: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (countRef.current > 0) return
    defineRefetch(refetch)
  }, [countRef, defineRefetch, refetch])

  useEffect(() => {
    if (!diversities) return
    const key = typeGraph !== OPTIONS.sex ? "total" : filterGraph ? "M" : "F"

    const years = diversities.data.map((d: { year: number }) => d.year)
    const values = diversities.data.map((d: IDiversity) => d[key])
    setData([
      {
        z: [values],
        x: years,
        y: [key],
        type: "heatmap",
      },
    ])
  }, [diversities, typeGraph, filterGraph])

  function handleChangeGenderGraph(e: SelectChangeEvent<OPTIONS>) {
    setTypeGraph(e.target.value as OPTIONS)
  }
  function handleChangeGraphFilter() {
    setFilterGraph(!filterGraph)
  }

  return {
    handleChangeDateRange,
    START_DATE,
    END_DATE,
    data,
    diversities,
    OPTIONS,
    typeGraph,
    filterGraph,
    handleChangeGenderGraph,
    handleChangeGraphFilter,
    DATE_RANGE,
    dateQueryParams,
    stateRequest: {
      isError,
      isFetching,
      isFetched,
    },
  }
}

export default useDiversity
