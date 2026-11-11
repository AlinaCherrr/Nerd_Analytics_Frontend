export const TICKET_STATUS = {
  inProgress: "in_progress",
  waitingForOperator: "waiting_for_operator",
  inOperatorProcessing: "in_operator_processing",
  reopened: "reopened",
  closed: "closed",
} as const

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS]

export interface TicketStatusOption {
  value: TicketStatus
  label: string
}

export interface TicketStatusesRepository {
  getStatuses: () => Promise<TicketStatusOption[]>
}
