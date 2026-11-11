import { notificationsMockSource } from "data/sources/Notifications/mock/mockSource"
import { mapNotification } from "./mappers"
import type { NotificationsRepository } from "./types"

export const notificationsMockRepository: NotificationsRepository = {
  getNotifications: async () => {
    const dtos = await notificationsMockSource.getNotifications()
    return dtos.map(mapNotification)
  },

  markAsRead: async (id) => {
    await notificationsMockSource.markAsRead(id)
  },

  markAllAsRead: async () => {
    await notificationsMockSource.markAllAsRead()
  },
}
