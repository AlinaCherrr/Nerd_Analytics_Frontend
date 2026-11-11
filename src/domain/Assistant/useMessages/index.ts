import { useQuery } from "@tanstack/react-query"
import { assistantRepository } from "data/repositories/Assistant"
import { MESSAGES_QUERY_KEY, MESSAGES_STALE_TIME } from "../constants"

export const useMessages = (sessionId: string | null) => {
  return useQuery({
    queryKey: [...MESSAGES_QUERY_KEY, sessionId ?? ""],
    queryFn: () => assistantRepository.getMessages(sessionId!),
    enabled: !!sessionId,
    staleTime: MESSAGES_STALE_TIME,
  })
}
