import { delay } from "shared/utils/delay"
import { MOCK_NOTIFICATION_DTOS } from "./fixtures"

const store = [...MOCK_NOTIFICATION_DTOS]

export const notificationsMockSource = {
  getNotifications: async () => {
    await delay(300)
    return [...store]
  },

  markAsRead: async (id: string): Promise<void> => {
    await delay(200)
    const item = store.find((n) => n.id === id)
    if (item) item.is_read = true
  },

  markAllAsRead: async (): Promise<void> => {
    await delay(200)
    store.forEach((n) => {
      n.is_read = true
    })
  },
}
