import { Link } from "react-router-dom"
import { ClipboardList, AlertCircle } from "lucide-react"
import { Sidebar, UserMenu } from "modules"
import { routes } from "shared/utils/routes"
import styles from "./GuestTicketTrackScreen.module.scss"
import { STATUS_CLASSES } from "./constants"
import { useGuestTicketTrackScreen } from "./useLogic"

export const GuestTicketTrackScreen = () => {
  const { ticket, isLoading, isError, getLabel, formatDate } = useGuestTicketTrackScreen()

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

          {isError && (
            <div className={styles.errorState}>
              <div className={styles.errorIcon}>
                <AlertCircle size={32} />
              </div>
              <h2 className={styles.errorTitle}>Обращение не найдено</h2>
              <p className={styles.errorText}>
                Ссылка недействительна или срок её действия истёк.
              </p>
              <Link to={routes.createTicket} className={styles.actionBtn}>
                Создать новое обращение
              </Link>
            </div>
          )}

          {ticket && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  <ClipboardList size={24} />
                </div>
                <div>
                  <p className={styles.cardProduct}>{ticket.product}</p>
                  <p className={styles.cardDate}>Создано {formatDate(ticket.createdAt)}</p>
                </div>
                <span className={`${styles.statusBadge} ${STATUS_CLASSES[ticket.status] ?? styles.statusInProgress}`}>
                  {getLabel(ticket.status)}
                </span>
              </div>

              {ticket.statusUpdatedAt && (
                <p className={styles.updatedAt}>
                  Статус обновлён: {formatDate(ticket.statusUpdatedAt)}
                </p>
              )}

              <div className={styles.registerPrompt}>
                <p className={styles.registerPromptText}>
                  Зарегистрируйтесь, чтобы управлять обращениями и получать уведомления в личном кабинете.
                </p>
                <div className={styles.registerPromptActions}>
                  <Link to={routes.register} className={styles.actionBtn}>
                    Зарегистрироваться
                  </Link>
                  <Link to={routes.login} className={styles.actionBtnSecondary}>
                    Войти
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
