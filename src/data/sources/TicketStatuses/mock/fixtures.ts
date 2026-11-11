import type { TicketStatusOptionDto } from "../types"

export const MOCK_TICKET_STATUS_DTOS: TicketStatusOptionDto[] = [
  { value: "in_progress", label: "В работе" },
  { value: "waiting_for_operator", label: "Ожидание оператора" },
  { value: "in_operator_processing", label: "У оператора" },
  { value: "reopened", label: "Переоткрыт" },
  { value: "closed", label: "Закрыт" },
]
