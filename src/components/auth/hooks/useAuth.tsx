import { getUserMe } from "@src/services/api/auth.services"
import { useQuery } from "@tanstack/react-query"

import { getToken } from "@src/utils/auth/cookies"

const useAuth = (isConnected: boolean) => {
  const { isError, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await getUserMe(),
    retry: false,
    staleTime: Infinity,
    enabled: isConnected && !!getToken(),
  })

  return { isError, isSuccess }
}

export default useAuth
