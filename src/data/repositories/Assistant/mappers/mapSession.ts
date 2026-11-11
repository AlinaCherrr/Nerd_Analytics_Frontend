import type { ChatSessionDto } from "data/sources/Assistant"
import type { ChatSession } from "../types"

export const mapSession = (dto: ChatSessionDto): ChatSession => ({
  id: dto.id,
  title: dto.title,
  ticketId: dto.ticket_id ?? null,
  ticketStatus: dto.ticket_status ?? null,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
  lastMessage: dto.last_message,
})
