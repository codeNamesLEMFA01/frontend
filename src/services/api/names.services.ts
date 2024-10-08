import { ITotalBySex } from "../types/names.types"

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const NAMES_URL = `/names`

export const getTotalBySex = async (): Promise<ITotalBySex> => {
  const response = await fetch(`${NAMES_URL}/total_by_sex/`)
  if (!response.ok)
    throw new Error(
      `🆘 status => ${response.status}, statusText: ${response.statusText}`,
    )
  const data = await response.json()
  return data
}

export const getNamesList = async ({
  limit = 100,
  offset = 0,
  name = "",
}: {
  limit?: number
  offset?: number
  name?: string
}): Promise<string[]> => {
  const response = await fetch(
    `${NAMES_URL}/names_list/?${limit && offset ? `limit=${limit}&offset=${offset}` : ""}${name ? `&name=${name}` : ""}`,
  )
  if (!response.ok)
    throw new Error(
      `🆘 status => ${response.status}, statusText: ${response.statusText}`,
    )
  const data = await response.json()
  return data
}
