import { ChangeEvent, useRef, useState } from "react"

import { getLengthNames } from "@src/services/api/trends.services"
import { useQuery } from "@tanstack/react-query"

const useTrendsLengthName = () => {
  const { data: trendsLengthName } = useQuery({
    queryKey: ["trendsLengthName"],
    queryFn: async () => await getLengthNames(),
    retry: false,
    staleTime: Infinity,
  })
  const [isViolonPlot, setIsViolonPlot] = useState(false)
  const [isFemale, setIsFemale] = useState(true)
  const graphTitle = useRef("")
  function handleChangeIsFemale(e: ChangeEvent<HTMLInputElement>) {
    setIsFemale(e.target.checked)
  }

  graphTitle.current = isViolonPlot
    ? `Répartition de la longueur des noms des ${isFemale ? "femmes" : "hommes"}`
    : "Évolution de la longueur des noms"

  return {
    trendsLengthName,
    graphData: { ...trendsLengthName?.data, title: graphTitle.current },
    isViolonPlot,
    setIsViolonPlot,
    isFemale,
    setIsFemale,
    handleChangeIsFemale,
  }
}

export default useTrendsLengthName
