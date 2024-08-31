import {useEffect, useRef, useState} from "react"
import { useQuery } from "@tanstack/react-query"
import {getDiversity} from "@services/api/diversity.services.ts";
import {TrendsTopNamesQueryEnum} from "@services/types/trends.type.ts";
import {END_DATE, START_DATE} from "@constants/date.ts";
import {DiversityQueryEnum, IDiversity} from "@services/types/diversity.type.ts";
import {SelectChangeEvent} from "@mui/material";


const MIN_DISTANCE = 1

enum OPTIONS {
  total = "Totalités des naissances",
  sex = "Totalite des naissances par genre",
}

interface IData {
  z: number[][],
  x: number[],
  y: string[],
  type: string,
}

const useDiversity = () => {
  const [inputQueryParams, setInputQueryParams] = useState({
    [DiversityQueryEnum.STARTYEAR]: START_DATE,
    [DiversityQueryEnum.ENDYEAR]: END_DATE,
  })
  const [data, setData] = useState<IData[]>([])
  const [typeGraph, setTypeGraph] = useState(OPTIONS.total)
  const [filterGraph, setFilterGraph] = useState<boolean>(true)
  const { data: diversities } = useQuery({
    queryKey: ["diversity", inputQueryParams],
    queryFn: async () => await getDiversity(inputQueryParams),
    retry: false,
    staleTime: Infinity,
  })
  const countRef = useRef(0)


  function handleChangeDateRange(
      _: unknown,
      newValue: number | number[],
      activeThumb: number,
  ) {
    if (!Array.isArray(newValue)) return
    countRef.current++

    if (newValue[1] - newValue[0] < MIN_DISTANCE + 1) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 2018 - MIN_DISTANCE)
        setInputQueryParams((prev) => ({
          ...prev,
          [TrendsTopNamesQueryEnum.STARTYEAR]: clamped,
          [TrendsTopNamesQueryEnum.ENDYEAR]: clamped + MIN_DISTANCE,
        }))
      } else {
        const clamped = Math.max(newValue[1], MIN_DISTANCE)
        setInputQueryParams((prev) => ({
          ...prev,
          [TrendsTopNamesQueryEnum.STARTYEAR]: clamped - MIN_DISTANCE,
          [TrendsTopNamesQueryEnum.ENDYEAR]: clamped,
        }))
      }
    } else {
      setInputQueryParams((prev) => ({
        ...prev,
        [TrendsTopNamesQueryEnum.STARTYEAR]: newValue[0],
        [TrendsTopNamesQueryEnum.ENDYEAR]: newValue[1],
      }))
    }
  }


  useEffect(() => {
    if (!diversities) return
    const key = typeGraph !== OPTIONS.sex ? 'total' : filterGraph ? "M" : "F"

    const years = diversities.data.map((d: { year: number })  => d.year);
    const values = diversities.data.map((d: IDiversity) => d[key]);
    setData([{
      z: [values],
      x: years,
      y: [key],
      type: 'heatmap',
    }])

  }, [diversities, typeGraph, filterGraph])

  function handleChangeGenderGraph(e: SelectChangeEvent<OPTIONS>) {
    setTypeGraph(e.target.value as OPTIONS)
  }
  function handleChangeGraphFilter() {
    setFilterGraph(!filterGraph)
  }

  return {
    handleChangeDateRange,
    setInputQueryParams,
    inputQueryParams,
    START_DATE,
    END_DATE,
    data,
    diversities,
    OPTIONS,
    typeGraph,
    filterGraph,
    handleChangeGenderGraph,
    handleChangeGraphFilter
  }
}

export default useDiversity
