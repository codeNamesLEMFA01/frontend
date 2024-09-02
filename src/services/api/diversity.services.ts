import { IDiversityResponse } from "@services/types/diversity.type.ts"

import { DateQueryEnum } from "@src/types/common"

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const NAMES_URL = `${BASE_URL}/names`

export const getDiversity = async ({
  startYear,
  endYear,
}: {
  [DateQueryEnum.STARTYEAR]: number
  [DateQueryEnum.ENDYEAR]: number
}): Promise<IDiversityResponse> => {
  const response = await fetch(
    `${NAMES_URL}/diversity/?start_year=${startYear}&end_year=${endYear}`,
  )

  if (!response.ok)
    throw new Error(
      `🆘 status => ${response.status}, statusText: ${response.statusText}`,
    )
  const data = await response.json()
  return data
}