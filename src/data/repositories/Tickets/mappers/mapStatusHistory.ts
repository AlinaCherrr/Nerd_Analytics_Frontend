import type { StatusHistoryDto } from "data/sources/Tickets"
import type { StatusHistoryEntry } from "../types"

export const mapStatusHistory = (dto: StatusHistoryDto): StatusHistoryEntry => ({
  id: dto.id,
  ticketId: dto.ticket_id,
  statusFrom: dto.status_from,
  statusTo: dto.status_to,
  changedBy: dto.changed_by,
  createdAt: dto.created_at,
})
