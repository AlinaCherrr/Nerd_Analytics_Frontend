import { useQuery } from "@tanstack/react-query"
import { notificationsRepository } from "data/repositories/Notifications"
import { NOTIFICATIONS_QUERY_KEY, NOTIFICATIONS_STALE_TIME } from "../constants"

export const useNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: notificationsRepository.getNotifications,
    staleTime: NOTIFICATIONS_STALE_TIME,
  })
}
