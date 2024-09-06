import { postUserLogout } from "@src/services/api/auth.services"

import { errorMessageStorage } from "@src/utils/auth/errorMessageStorage"

const useLogout = () => {
  async function handleLogout() {
    const res = await postUserLogout()
    if (res) {
      errorMessageStorage.setError(res.message, "success")
      window.location.reload()
      return
    }
    errorMessageStorage.setError("Une erreur est survenue", "error")
  }
  return { handleLogout }
}

export default useLogout
