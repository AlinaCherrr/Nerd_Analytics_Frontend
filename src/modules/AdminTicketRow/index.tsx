import { TicketActionButton } from "modules/TicketActionButton"
import { TICKET_PRIORITY_LABELS } from "domain/Tickets"
import styles from "./styles.module.scss"
import { PRIORITY_BADGE, STATUS_BADGE } from "./constants"
import type { AdminTicketRowProps } from "./types"
import { useAdminTicketRow } from "./useLogic"

export const AdminTicketRow = ({ ticket, onClick }: AdminTicketRowProps) => {
  const { getLabel, category, formatDate } = useAdminTicketRow({ ticket })

  return (
    <div className={styles.ticketRow} onClick={onClick}>
      <div className={styles.rowTop}>
        <span className={styles.ticketProduct}>{ticket.title ?? ticket.product ?? "—"}</span>
        <span className={`${styles.badge} ${STATUS_BADGE[ticket.status] ?? styles.statusInProgress}`}>
          {getLabel(ticket.status)}
        </span>
        <span className={`${styles.badge} ${PRIORITY_BADGE[ticket.priority]}`}>
          {TICKET_PRIORITY_LABELS[ticket.priority] ?? ticket.priority}
        </span>
      </div>

      <div className={styles.rowMeta}>
        {category && <span className={styles.metaText}>{category}</span>}
        <span className={styles.metaText}>{formatDate(ticket.date)}</span>
        {ticket.deadline && (
          <span className={styles.metaText}>дедлайн: {formatDate(ticket.deadline)}</span>
        )}
      </div>

      <div className={styles.rowActions}>
        <TicketActionButton ticket={ticket} />
      </div>
    </div>
  )
}

export type { AdminTicketRowProps } from "./types"
