import type { TicketDto } from "data/sources/Tickets"
import type { Ticket } from "../types"

export const mapTicket = (dto: TicketDto): Ticket => ({
  id: dto.id,
  clientId: dto.client_id,
  responsibleId: dto.responsible_id,
  title: dto.title ?? null,
  product: dto.product,
  status: dto.status,
  priority: dto.priority,
  date: dto.date,
  deadline: dto.deadline,
  closedAt: dto.closed_at,
  reopenedCount: dto.reopened_count,
  aiSuggestedCategory: dto.ai_suggested_category,
  finalCategory: dto.final_category,
  isAdminChanged: dto.is_admin_changed,
  keywords: dto.keywords ?? [],
  confidence: dto.confidence,
  slaTtfrMin: dto.sla_ttfr_min,
  slaTtrMin: dto.sla_ttr_min,
  action: dto.action ?? null,
  actionLabel: dto.action_label ?? null,
})
