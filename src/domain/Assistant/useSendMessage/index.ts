import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assistantRepository } from "data/repositories/Assistant"
import type { Message } from "data/repositories/Assistant"
import { CHAT_SESSIONS_QUERY_KEY, MESSAGES_QUERY_KEY } from "../constants"

export const useSendMessage = (sessionId: string | null) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ content, files }: { content: string; files?: File[] }) => {
      if (!sessionId) throw new Error("No active session")
      return assistantRepository.sendMessage(sessionId, content, files)
    },
    onMutate: async ({ content }: { content: string; files?: File[] }) => {
      if (!sessionId) return undefined
      await queryClient.cancelQueries({ queryKey: [...MESSAGES_QUERY_KEY, sessionId] })
      const previousMessages = queryClient.getQueryData<Message[]>([...MESSAGES_QUERY_KEY, sessionId])
      const optimisticMessage: Message = {
        id: `opt-${Date.now()}`,
        sessionId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      }
      queryClient.setQueryData<Message[]>([...MESSAGES_QUERY_KEY, sessionId], (old) => [
        ...(old ?? []),
        optimisticMessage,
      ])
      return { previousMessages }
    },
    onError: (_err, _content, context) => {
      if (sessionId && context?.previousMessages !== undefined) {
        queryClient.setQueryData([...MESSAGES_QUERY_KEY, sessionId], context.previousMessages)
      }
    },
    onSuccess: (result) => {
      if (sessionId) {
        queryClient.setQueryData<Message[]>([...MESSAGES_QUERY_KEY, sessionId], (old) => {
          const withoutOptimistic = (old ?? []).filter((m) => !m.id.startsWith("opt-"))
          const existingIds = new Set(withoutOptimistic.map((m) => m.id))
          const toAdd = [result.userMessage, result.assistantMessage].filter(
            (m) => !existingIds.has(m.id),
          )
          return [...withoutOptimistic, ...toAdd]
        })
      }
      void queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_QUERY_KEY })
    },
  })
}
