import { useState } from "react"
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from "domain/Notifications"
import type { Filter } from "../types"

export const useNotificationsScreen = () => {
  const [filter, setFilter] = useState<Filter>("all")

  const { data: notifications = [], isLoading, isError, refetch } = useNotifications()
  const { mutate: markAsRead } = useMarkAsRead()
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead()

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const readCount = notifications.filter((n) => n.isRead).length

  const countByFilter = (f: Filter) => {
    if (f === "all") return notifications.length
    if (f === "unread") return unreadCount
    return readCount
  }

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead
    if (filter === "read") return n.isRead
    return true
  })

  const handleMarkAllAsRead = () => markAllAsRead()

  return {
    filter,
    setFilter,
    isLoading,
    isError,
    retry: () => void refetch(),
    unreadCount,
    countByFilter,
    filteredNotifications,
    markAsRead,
    handleMarkAllAsRead,
    isMarkingAll,
  }
}
