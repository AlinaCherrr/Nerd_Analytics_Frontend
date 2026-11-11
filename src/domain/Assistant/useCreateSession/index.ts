import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assistantRepository } from "data/repositories/Assistant"
import { CHAT_SESSIONS_QUERY_KEY, MESSAGES_QUERY_KEY } from "../constants"
import type { CreateSessionResult } from "data/repositories/Assistant"

export const useCreateSession = (onCreated: (result: CreateSessionResult) => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ firstMessage, files }: { firstMessage: string; files?: File[] }) =>
      assistantRepository.createSession(firstMessage, files),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_QUERY_KEY })
      queryClient.setQueryData([...MESSAGES_QUERY_KEY, result.session.id], result.messages)
      onCreated(result)
    },
  })
}
