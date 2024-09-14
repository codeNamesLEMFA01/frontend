import { postUserLogout } from "@src/services/api/auth.services"

import { storageMessage } from "@src/utils/auth/storageMessage"

const useLogout = () => {
  async function handleLogout() {
    const res = await postUserLogout()
    if (res) {
      storageMessage.setMessage(res.message, "success")
      window.location.reload()
      return
    }
    storageMessage.setMessage("Une erreur est survenue", "error")
  }
  return { handleLogout }
}

export default useLogout
