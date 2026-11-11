export type TicketStatusDto =
  | "in_progress"
  | "waiting_for_operator"
  | "in_operator_processing"
  | "reopened"
  | "closed"

export interface TicketStatusOptionDto {
  value: TicketStatusDto
  label: string
}
