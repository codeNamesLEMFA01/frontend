import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"

import { getNamesList } from "@src/services/api/names.services"
import { getEvolutionName } from "@src/services/api/trends.services"
import { IServiceTrendsName } from "@src/services/types/trends.type"
import { useQuery } from "@tanstack/react-query"
import { useDebouncedCallback } from "use-debounce"

import useLabelError from "@src/hooks/useLabelError"

import { capitalized } from "@src/utils/capitalized"

interface IData extends Omit<IServiceTrendsName, "data"> {
  graphData: { x: string[]; yM: number[]; yF: number[]; yT: number[] }
}

// eslint-disable-next-line react-refresh/only-export-components
const LIMIT = 100
// eslint-disable-next-line react-refresh/only-export-components
const OFFSET = Math.floor(Math.random() * 98401)
const MIN_LENGTH_SEARCH_NAME = 3
const DEBOUNCE_TIME = 300

const useTrendsName = () => {
  const queryName = useRef<string>()
  const [selectedName, setSelectedName] = useState<string>()
  const { showLabelError, clearLabelError, isLabelError, LabelErrorComponent } =
    useLabelError()

  const {
    data: namesList,
    refetch: refetchNamesList,
    isError,
  } = useQuery({
    queryKey: ["names_list", selectedName],
    queryFn: async () =>
      await getNamesList({
        name: queryName.current,
        limit: LIMIT,
        offset: OFFSET,
      }),
    retry: false,
    staleTime: Infinity,
  })
  const { data: trends } = useQuery({
    queryKey: ["trend_name", selectedName],
    queryFn: async () => await getEvolutionName(selectedName),
    retry: false,
    staleTime: Infinity,
    enabled: !!selectedName && queryName.current !== selectedName,
  })

  const [data, setData] = useState<IData>()
  const [filterGraph, setFilterGraph] = useState<{ [key: string]: boolean }>({
    female: true,
    male: true,
    total: false,
  })

  function handleChangeName(value: string | null) {
    if (!value) return
    if (/[^a-zA-Z]+$/.test(value)) {
      showLabelError()
      return
    }
    if (!namesList || !namesList.length || !namesList.includes(value)) {
      console.log("🆘 IF = NAMES LIST IN CHANGE NAME ", namesList, " ", value)
      return
    }
    if (isLabelError) clearLabelError()
    setSelectedName(value)
    console.log("🆘 OUT = NAMES LIST IN CHANGE NAME ", namesList, " ", value)
    // refetch()
  }

  const handleUpdateNamesList = useDebouncedCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      queryName.current = target.value.toLowerCase()
      if (!/^[a-zA-Z]+$/.test(queryName.current)) {
        showLabelError()
        return
      }
      if (!queryName.current || queryName.current.length < MIN_LENGTH_SEARCH_NAME)
        return
      if (isLabelError) clearLabelError()
      refetchNamesList()
    },
    DEBOUNCE_TIME,
  )

  function handleChangeGraphFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilterGraph((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }))
  }

  useEffect(() => {
    // The first time we set the first name in the list
    if (!namesList) return
    if (selectedName) return
    setSelectedName(namesList[0])
  }, [namesList, selectedName])

  useEffect(() => {
    if (isLabelError) return
    if (isError) return
    if (!trends) {
      setData(undefined)
      return
    }
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
  }, [data, trends, isLabelError, isError])
  return {
    data,
    namesList,
    selectedName: capitalized(selectedName),
    handleChangeName,
    filterGraph,
    handleChangeGraphFilter,
    handleUpdateNamesList,
    setSelectedName,
    isLabelError,
    LabelErrorComponent,
  }
}

export default useTrendsName
