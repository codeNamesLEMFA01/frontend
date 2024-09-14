import { getUtilsInfo } from "@src/services/api/utils.services"
import { useQuery } from "@tanstack/react-query"

const useHeroInfo = () => {
  const { data: infos } = useQuery({
    queryKey: ["infos"],
    queryFn: async () => await getUtilsInfo(),
    retry: false,
    staleTime: Infinity,
  })
  return {
    infos,
  }
}

export default useHeroInfo
