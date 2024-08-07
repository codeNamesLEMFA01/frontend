import { ITotalBySex } from "../types/names.types"

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const NAMES_URL = `${BASE_URL}/names`

export const getTotalBySex = async (): Promise<ITotalBySex> => {
  const response = await fetch(`${NAMES_URL}/total_by_sex/`)
  const data = await response.json()
  return data
}
