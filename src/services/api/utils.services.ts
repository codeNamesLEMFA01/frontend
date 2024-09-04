import { IUtilsInfoApi } from "../types/utils.type"

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const NAMES_URL = `${BASE_URL}/util`

export const getUtilsInfo = async (): Promise<IUtilsInfoApi> => {
  const response = await fetch(`${NAMES_URL}/info`)
  if (!response.ok)
    throw new Error(
      `🆘 status => ${response.status}, statusText: ${response.statusText}`,
    )
  const data = await response.json()
  return data
}
