import { getToken } from "@src/utils/auth/cookies"
import { disconnect } from "@src/utils/auth/disconnect"

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const fetchAPICredentialsInterceptor = async () => {
  const { fetch: originalFetch } = window
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const initConfig: RequestInit = { ...init, credentials: "include" }
    const endPoint: RequestInfo = BASE_URL + input
    const token = getToken()

    initConfig.headers = {
      ...initConfig.headers,
      Authorization: `Bearer ${token}`,
    }

    const response = await originalFetch(endPoint, initConfig)

    if (response.status === 401) disconnect()

    return response
  }
}
