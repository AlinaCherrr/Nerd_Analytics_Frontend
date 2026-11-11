import type { TicketStatusOptionDto } from "data/sources/TicketStatuses"
import type { TicketStatusOption } from "../types"

export const mapTicketStatus = (dto: TicketStatusOptionDto): TicketStatusOption => ({
  value: dto.value,
  label: dto.label,
})
