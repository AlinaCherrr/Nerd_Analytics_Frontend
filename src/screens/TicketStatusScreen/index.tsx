import { ClipboardList } from "lucide-react"
import {
 Sidebar, UserMenu, TicketActionButton, RatingModal
} from "modules"
import { TICKET_PRIORITY_LABELS } from "domain/Tickets"
import { TICKET_STATUS } from "data/repositories/TicketStatuses"
import { ErrorState } from "shared/ui/ErrorState"
import styles from "./TicketStatusScreen.module.scss"
import { PRIORITY_CLASS, STATUS_CLASS } from "./constants"
import { useTicketStatusScreen } from "./useLogic"

export const TicketStatusScreen = () => {
  const {
    ticket,
    category,
    isLoading,
    isError,
    retry,
    getLabel,
    isRating,
    openRating,
    closeRating,
    formatDate,
  } = useTicketStatusScreen()

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Статус обращения</h1>
          <UserMenu />
        </div>

        <div className={styles.content}>
          {isLoading && (
            <div className={styles.loading}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          )}

          {!isLoading && isError && (
            <ErrorState title="Не удалось загрузить обращение" onRetry={retry} />
          )}

          {!isLoading && !isError && !ticket && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <ClipboardList size={36} />
              </div>
              <h2 className={styles.emptyTitle}>Обращение не найдено</h2>
              <p className={styles.emptySubtitle}>Проверьте ссылку или выберите обращение из списка</p>
            </div>
          )}

          {!isLoading && !isError && ticket && (
            <div className={styles.group}>
              <h2 className={styles.groupTitle}>{ticket.product ?? "Без продукта"}</h2>
              <div className={styles.ticket}>
                <div className={styles.ticketHeader}>
                  <span className={`${styles.statusBadge} ${STATUS_CLASS[ticket.status] ?? styles.statusInProgress}`}>
                    {getLabel(ticket.status)}
                  </span>
                  <span className={`${styles.priorityBadge} ${PRIORITY_CLASS[ticket.priority]}`}>
                    {TICKET_PRIORITY_LABELS[ticket.priority]}
                  </span>
                </div>
                {category && <p className={styles.ticketCategory}>{category}</p>}
                <div className={styles.ticketFooter}>
                  <span className={styles.ticketDate}>{formatDate(ticket.date)}</span>
                  <div className={styles.ticketActions}>
                    {ticket.status === TICKET_STATUS.closed && (
                      <button className={styles.actionBtn} onClick={openRating}>
                        Оценить
                      </button>
                    )}
                    <TicketActionButton ticket={ticket} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isRating && ticket && (
        <RatingModal
          ticketId={ticket.id}
          product={ticket.product ?? ""}
          onClose={closeRating}
        />
      )}
    </div>
  )
}
