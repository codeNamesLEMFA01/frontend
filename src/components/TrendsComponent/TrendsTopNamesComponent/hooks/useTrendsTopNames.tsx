import { ChangeEvent, useEffect, useRef, useState } from "react"

import { getTrendsTopNames } from "@src/services/api/trends.services"
import { TrendsTopNamesQueryEnum } from "@src/services/types/trends.type"
import { useQuery } from "@tanstack/react-query"
import { useDebouncedCallback } from "use-debounce"

import { END_DATE, START_DATE } from "@src/utils/constants/date"

const MIN_DISTANCE = 1

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
const useTrendsTopNames = () => {
  const [inputQueryParams, setInputQueryParams] = useState({
    [TrendsTopNamesQueryEnum.STARTYEAR]: START_DATE,
    [TrendsTopNamesQueryEnum.ENDYEAR]: END_DATE,
    [TrendsTopNamesQueryEnum.TOPN]: "10",
  })
  const { data: trendsTopNames, refetch } = useQuery({
    queryKey: ["trends top names"],
    queryFn: async () => await getTrendsTopNames(inputQueryParams),
    retry: false,
    staleTime: Infinity,
  })
  const [isFemale, setIsFemale] = useState(false)
  const countRef = useRef(0)

  const debounceRefetch = useDebouncedCallback(() => {
    refetch()
  }, 1000)

  function handleChangeInputQueryParams(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setInputQueryParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    countRef.current++
  }

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
    if (!countRef.current) return
    debounceRefetch()
  }, [inputQueryParams, debounceRefetch])

  return {
    trendsTopNames,
    inputQueryParams,
    setInputQueryParams,
    handleChangeInputQueryParams,
    isFemale,
    setIsFemale,
    handleChangeDateRange,
    DATE_RANGE,
    START_DATE,
    END_DATE,
  }
}

export default useTrendsTopNames
