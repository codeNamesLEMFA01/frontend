import {
  IServiceTrendsName,
  IServiceTrendsTopNames,
  ITrendsLengthNameService,
  TrendsTopNamesQueryEnum,
} from "../types/trends.type"

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const NAMES_URL = `${BASE_URL}/names`

export const getEvolutionName = async (
  name: string | undefined,
): Promise<IServiceTrendsName> => {
  const response = await fetch(`${NAMES_URL}/evolution_name/${name}`)
  const data = await response.json()
  if (data.detail) {
    throw new Error(data.detail)
  }
  return data
}

export const getTrendsTopNames = async ({
  startYear,
  endYear,
  topN = "10",
}: {
  [TrendsTopNamesQueryEnum.STARTYEAR]: number
  [TrendsTopNamesQueryEnum.ENDYEAR]: number
  [TrendsTopNamesQueryEnum.TOPN]?: string
}): Promise<IServiceTrendsTopNames> => {
  const response = await fetch(
    `${NAMES_URL}/trends_name/top/?start_year=${startYear}&end_year=${endYear}&top_n=${topN}`,
  )
  const data = await response.json()
  if (data.detail) {
    throw new Error(data.detail)
  }
  return data
}

export const getLengthNames = async (): Promise<ITrendsLengthNameService> => {
  const response = await fetch(`${NAMES_URL}/trends_name/length_name/`)
  const data = await response.json()
  if (data.detail) {
    throw new Error(data.detail)
  }
  return data
}
