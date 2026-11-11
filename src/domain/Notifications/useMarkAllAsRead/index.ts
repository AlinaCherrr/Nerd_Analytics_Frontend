import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationsRepository } from "data/repositories/Notifications"
import { NOTIFICATIONS_QUERY_KEY } from "../constants"

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => notificationsRepository.markAllAsRead(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY })
    },
  })
}
