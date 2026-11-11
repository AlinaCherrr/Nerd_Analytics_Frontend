import { notificationsSource } from "data/sources/Notifications"
import { mapNotification } from "./mappers"
import type { NotificationsRepository } from "./types"

export const notificationsRealRepository: NotificationsRepository = {
  getNotifications: async () => {
    const dtos = await notificationsSource.getNotifications()
    return dtos.map(mapNotification)
  },

  markAsRead: async (id) => {
    await notificationsSource.markAsRead(id)
  },

  markAllAsRead: async () => {
    await notificationsSource.markAllAsRead()
  },
}
