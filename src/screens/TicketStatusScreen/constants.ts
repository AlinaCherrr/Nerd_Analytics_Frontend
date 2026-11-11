import type { TicketPriority } from "data/repositories/Tickets"
import type { TicketStatus } from "data/repositories/TicketStatuses"
import styles from "./TicketStatusScreen.module.scss"

export const STATUS_CLASS: Record<TicketStatus, string> = {
  in_progress: styles.statusInProgress,
  waiting_for_operator: styles.statusWaiting,
  in_operator_processing: styles.statusInProgress,
  reopened: styles.statusReopened,
  closed: styles.statusClosed,
}

export const PRIORITY_CLASS: Record<TicketPriority, string> = {
  low: styles.priorityLow,
  medium: styles.priorityMedium,
  high: styles.priorityHigh,
}
