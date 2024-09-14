import { getToken } from "@src/utils/auth/cookies"
import { storageMessage } from "@src/utils/auth/storageMessage"

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

    if (response.status === 401) {
      storageMessage.setMessage("Veuillez vous reconnecter", "warning")
      window.location.reload()
    }

    return response
  }
}
