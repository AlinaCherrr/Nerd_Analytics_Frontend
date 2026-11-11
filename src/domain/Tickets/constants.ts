import type { TicketPriority, TicketProduct } from "data/repositories/Tickets"

export const TICKETS_QUERY_KEY = ["tickets"] as const
export const TICKETS_STALE_TIME = 60 * 1000

export const GUEST_TICKET_TRACK_QUERY_KEY = ["guest-ticket-track"] as const

export const TICKET_PRODUCTS: TicketProduct[] = [
  "веб-сервис",
  "платёжный сервис",
  "мобильное приложение",
  "API интеграция",
  "личный кабинет",
  "аналитический модуль",
]

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
}
