import { useQuery } from "@tanstack/react-query"
import { assistantRepository } from "data/repositories/Assistant"
import { CHAT_SESSIONS_QUERY_KEY, CHAT_SESSIONS_STALE_TIME } from "../constants"

export const useChatSessions = () => {
  return useQuery({
    queryKey: CHAT_SESSIONS_QUERY_KEY,
    queryFn: assistantRepository.getSessions,
    staleTime: CHAT_SESSIONS_STALE_TIME,
  })
}
