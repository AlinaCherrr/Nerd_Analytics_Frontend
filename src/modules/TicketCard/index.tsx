import styles from "./styles.module.scss"
import type { TicketCardProps } from "./types"
import { TicketActionButton } from "modules/TicketActionButton"
import { useTicketStatuses } from "domain/TicketStatuses"
import { PRIORITY_CONFIG, STATUS_CLASS } from "./constants"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })

export const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
  const { getLabel } = useTicketStatuses()
  const statusClass = STATUS_CLASS[ticket.status] ?? styles.statusInProgress
  const priority = PRIORITY_CONFIG[ticket.priority]
  const category = ticket.finalCategory ?? ticket.aiSuggestedCategory
  const subtitle = category ?? (ticket.keywords.length > 0 ? ticket.keywords.join(", ") : null)
  const displayTitle = ticket.title ?? ticket.product ?? "Обращение"

  return (
    <div className={`${styles.card} ${onClick ? styles.cardClickable : ""}`} onClick={onClick}>
      <div className={styles.cardHeader}>
        <span className={`${styles.priorityBadge} ${priority.className}`}>{priority.label}</span>
        <span className={`${styles.statusBadge} ${statusClass}`}>{getLabel(ticket.status)}</span>
      </div>

      <h3 className={styles.title}>{displayTitle}</h3>
      {subtitle && <p className={styles.description}>{subtitle}</p>}

      <div className={styles.cardFooter}>
        <span className={styles.date}>{formatDate(ticket.date)}</span>
        <TicketActionButton ticket={ticket} />
      </div>
    </div>
  )
}
