import type { TicketStatus } from "data/repositories/TicketStatuses"
import styles from "./styles.module.scss"

export const NEW_CHAT_LABEL = "Новый чат"
export const HISTORY_TITLE = "История чатов"

export const STATUS_CLASS: Record<TicketStatus, string> = {
  in_progress: styles.statusInProgress,
  waiting_for_operator: styles.statusWaiting,
  in_operator_processing: styles.statusOperator,
  reopened: styles.statusReopened,
  closed: styles.statusClosed,
}
