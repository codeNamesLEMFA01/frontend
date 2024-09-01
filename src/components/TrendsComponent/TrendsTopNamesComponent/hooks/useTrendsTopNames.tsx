import { ChangeEvent, useEffect, useState } from "react"

import { getTrendsTopNames } from "@src/services/api/trends.services"
import { TrendsTopNamesQueryEnum } from "@src/services/types/trends.type"
import { useQuery } from "@tanstack/react-query"
import { useDebouncedCallback } from "use-debounce"

import useHandleChangeDate from "@src/components/common/SliderDateRange/hooks/useHandleChangeDate"

import { END_DATE, START_DATE } from "@src/utils/constants/date"

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
const OFFSET_DATE = 20
const MIN_TOP = 2
const MAX_TOP = 10

const useTrendsTopNames = () => {
  const [inputQueryParams, setInputQueryParams] = useState({
    [TrendsTopNamesQueryEnum.TOPN]: "10",
  })
  const { dateQueryParams, countRef, handleChangeDateRange, defineRefetch } =
    useHandleChangeDate({ startDate: START_DATE, endDate: START_DATE + OFFSET_DATE })
  const {
    data: trendsTopNames,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["trends_top_names"],
    queryFn: async () =>
      await getTrendsTopNames({
        ...inputQueryParams,
        ...dateQueryParams,
      }),
    retry: false,
    staleTime: Infinity,
  })

  const [isFemale, setIsFemale] = useState(false)

  function handleChangeInputQueryParams(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value, name } = e.target
    if (!value) return
    setInputQueryParams((prev) => ({
      ...prev,
      [name]: value,
    }))
    countRef.current++
  }

  const fetchByTop = useDebouncedCallback(() => {
    refetch()
  }, 500)

  useEffect(() => {
    if (!countRef.current) return
    if (
      +inputQueryParams[TrendsTopNamesQueryEnum.TOPN] <= MIN_TOP - 1 ||
      +inputQueryParams[TrendsTopNamesQueryEnum.TOPN] >= MAX_TOP
    )
      return
    fetchByTop()
  }, [inputQueryParams, countRef, fetchByTop])

  useEffect(() => {
    if (countRef.current > 0) return
    defineRefetch(refetch)
  }, [countRef, defineRefetch, refetch])

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
    dateQueryParams,
    MIN_TOP,
    MAX_TOP,
    isFetching,
    isError,
  }
}

export default useTrendsTopNames
