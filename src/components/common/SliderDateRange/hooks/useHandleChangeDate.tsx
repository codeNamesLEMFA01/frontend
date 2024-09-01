import { useEffect, useRef, useState } from "react"

import { useDebouncedCallback } from "use-debounce"

import { END_DATE, START_DATE } from "@src/utils/constants/date"

import { DateQueryEnum } from "@src/types/common"

interface IProps {
  startDate?: number
  endDate?: number
  debounceTime?: number
  minDistance?: number
}

const MIN_DISTANCE = 1
const DEBOUNCE_TIME = 1000

/*
__________ USAGE ________

  You need to call defineRefetch in a useEffect
  Into the component you want to use this hook

  useEffect(() => {
    if (countRef.current > 0) return
    defineRefetch(refetch)
  }, [countRef, defineRefetch, refetch])
*/

const useHandleChangeDate = ({
  startDate,
  endDate,
  debounceTime,
  minDistance,
}: IProps) => {
  const [dateQueryParams, setDateQueryParams] = useState({
    [DateQueryEnum.STARTYEAR]: startDate || START_DATE,
    [DateQueryEnum.ENDYEAR]: endDate || END_DATE,
  })

  const ecart = minDistance || MIN_DISTANCE
  const countRef = useRef(0)
  const refetchRef = useRef<() => void | undefined>()
  function defineRefetch(refetch: () => void) {
    if (!refetchRef.current) refetchRef.current = refetch
  }

  const debounceRefetch = useDebouncedCallback(() => {
    if (!refetchRef.current) return
    refetchRef.current()
  }, debounceTime || DEBOUNCE_TIME)

  function handleChangeDateRange(
    _: unknown,
    newValue: number | number[],
    activeThumb: number,
  ) {
    if (!Array.isArray(newValue)) return
    countRef.current++

    if (newValue[1] - newValue[0] < ecart + 1) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 2018 - ecart)
        setDateQueryParams((prev) => ({
          ...prev,
          [DateQueryEnum.STARTYEAR]: clamped,
          [DateQueryEnum.ENDYEAR]: clamped + ecart,
        }))
      } else {
        const clamped = Math.max(newValue[1], ecart)
        setDateQueryParams((prev) => ({
          ...prev,
          [DateQueryEnum.STARTYEAR]: clamped - ecart,
          [DateQueryEnum.ENDYEAR]: clamped,
        }))
      }
    } else {
      setDateQueryParams((prev) => ({
        ...prev,
        [DateQueryEnum.STARTYEAR]: newValue[0],
        [DateQueryEnum.ENDYEAR]: newValue[1],
      }))
    }
  }

  useEffect(() => {
    if (!countRef.current) return
    if (!refetchRef.current) return
    debounceRefetch()
  }, [dateQueryParams, debounceRefetch])

  return {
    dateQueryParams,
    handleChangeDateRange,
    setDateQueryParams,
    countRef,
    defineRefetch,
  }
}

export default useHandleChangeDate
