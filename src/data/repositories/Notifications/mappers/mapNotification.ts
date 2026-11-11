import type { NotificationDto } from "data/sources/Notifications"
import { MESSAGE_MAP, TITLE_MAP } from "../constants"
import type { Notification, NotificationType } from "../types"

export const mapNotification = (dto: NotificationDto): Notification => {
  const key = `${dto.type}_${dto.ticket_id ? "ticket" : "general"}`
  const uiType: NotificationType = dto.ticket_id
    ? dto.type === "push"
      ? "ticket_update"
      : "new_message"
    : "info"

  return {
    id: dto.id,
    type: uiType,
    title: TITLE_MAP[key] ?? "Уведомление",
    message: MESSAGE_MAP[key] ?? "Уведомление от платформы",
    isRead: dto.is_read,
    createdAt: dto.created_at,
    ticketId: dto.ticket_id ?? undefined,
  }
}
