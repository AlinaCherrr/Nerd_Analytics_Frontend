import type { TicketPriority } from "data/repositories/Tickets"
import type { TicketStatus } from "data/repositories/TicketStatuses"
import styles from "./styles.module.scss"

export const STATUS_CLASS: Record<TicketStatus, string> = {
  in_progress: styles.statusInProgress,
  waiting_for_operator: styles.statusWaiting,
  in_operator_processing: styles.statusOperator,
  reopened: styles.statusReopened,
  closed: styles.statusClosed,
}

export const PRIORITY_CONFIG: Record<TicketPriority, { label: string; className: string }> = {
  low: { label: "Низкий", className: styles.priorityLow },
  medium: { label: "Средний", className: styles.priorityMedium },
  high: { label: "Высокий", className: styles.priorityHigh },
}