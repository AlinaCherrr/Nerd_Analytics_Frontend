import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assistantRepository } from "data/repositories/Assistant"
import { CHAT_SESSIONS_QUERY_KEY } from "../constants"

export const useResolveChat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (chatId: string) => assistantRepository.resolveChat(chatId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_QUERY_KEY })
    },
  })
}
