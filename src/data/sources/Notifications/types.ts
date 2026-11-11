export type NotificationApiType = "email" | "push"
export type NotificationApiStatus = "pending" | "sent" | "failed"
export type NotificationTypeDto = "ticket_update" | "new_message" | "system" | "info"

export interface NotificationDto {
  id: string
  client_id: string
  ticket_id: string | null
  type: NotificationApiType
  status: NotificationApiStatus
  is_read: boolean
  created_at: string
}
