import { apiClient } from "data/api/apiClient"
import type { TicketStatusDto, TicketStatusOptionDto } from "./types"

export const ticketStatusesSource = {
  getStatuses: () =>
    apiClient.get<TicketStatusOptionDto[]>("/ticket-statuses").then((r) => r.data),
}

export type { TicketStatusDto, TicketStatusOptionDto }
