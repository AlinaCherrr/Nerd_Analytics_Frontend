import type { TicketStatus } from "data/repositories/TicketStatuses"
import styles from "./GuestTicketTrackScreen.module.scss"

export const STATUS_CLASSES: Record<TicketStatus, string> = {
  in_progress: styles.statusInProgress,
  closed: styles.statusClosed,
  reopened: styles.statusReopened,
  waiting_for_operator: styles.statusWaiting,
  in_operator_processing: styles.statusInProgress,
}
