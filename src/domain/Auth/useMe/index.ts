import { useQuery } from "@tanstack/react-query"
import { authRepository } from "data/repositories/Auth"
import { ME_QUERY_KEY, ME_STALE_TIME } from "../constants"

export const useMe = () => {
  const hasTokens = authRepository.hasTokens()
  const query = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: authRepository.me,
    enabled: hasTokens,
    retry: false,
    staleTime: ME_STALE_TIME,
  })

  return {
    ...query,
    data: hasTokens ? query.data : undefined,
    isLoading: hasTokens ? query.isLoading : false,
  }
}

export type { User } from "./types"
