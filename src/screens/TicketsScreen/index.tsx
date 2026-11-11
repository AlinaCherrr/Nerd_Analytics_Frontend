import {
 Loader, CheckCircle, FileText, Clock, UserCheck, RotateCcw
} from "lucide-react"
import { ErrorState } from "shared/ui/ErrorState"
import styles from "./TicketsScreen.module.scss"
import {
 Sidebar, UserMenu, TicketCard, AdminTicketRow
} from "modules"
import { TICKET_PRIORITY_LABELS, TICKET_PRODUCTS } from "domain/Tickets"
import { TICKET_STATUS } from "data/repositories/TicketStatuses"
import { ALL_TAB_LABEL } from "./constants"
import type { TabItem } from "./types"
import { useTicketsScreen } from "./useLogic"

const TABS: TabItem[] = [
  { value: "all", icon: <FileText size={15} /> },
  { value: TICKET_STATUS.inProgress, icon: <Loader size={15} /> },
  { value: TICKET_STATUS.waitingForOperator, icon: <Clock size={15} /> },
  { value: TICKET_STATUS.inOperatorProcessing, icon: <UserCheck size={15} /> },
  { value: TICKET_STATUS.reopened, icon: <RotateCcw size={15} /> },
  { value: TICKET_STATUS.closed, icon: <CheckCircle size={15} /> },
]

export const TicketsScreen = () => {
  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    filterProduct,
    setFilterProduct,
    filterPriority,
    setFilterPriority,
    isAdmin,
    isLoading,
    isError,
    retry,
    getLabel,
    openTicket,
    filtered,
    countByTab,
    hasFilters,
    handleResetFilters,
  } = useTicketsScreen()

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>{isAdmin ? "Все обращения" : "Мои обращения"}</h1>
          <UserMenu />
        </div>

        <div className={styles.content}>
          {isAdmin && (
            <div className={styles.toolbar}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Поиск по продукту, категории..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className={styles.filterSelect}
                value={filterProduct}
                onChange={(e) => setFilterProduct(e.target.value)}
              >
                <option value="">Все продукты</option>
                {TICKET_PRODUCTS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="">Все приоритеты</option>
                {Object.entries(TICKET_PRIORITY_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>

              {hasFilters && (
                <button className={styles.resetBtn} onClick={handleResetFilters}>
                  Сбросить
                </button>
              )}
            </div>
          )}

          <div className={styles.tabs}>
            {TABS.map(({ value, icon }) => (
              <button
                key={value}
                className={`${styles.tab} ${activeTab === value ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(value)}
              >
                {icon}
                <span>{value === "all" ? ALL_TAB_LABEL : getLabel(value)}</span>
                {!isLoading && (
                  <span className={styles.tabCount}>{countByTab(value)}</span>
                )}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className={styles.loading}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          )}

          {!isLoading && isError && (
            <ErrorState title="Не удалось загрузить обращения" onRetry={retry} />
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FileText size={36} />
              </div>
              <h2 className={styles.emptyTitle}>Нет обращений</h2>
              <p className={styles.emptySubtitle}>В этой категории пока нет обращений</p>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className={styles.ticketsList}>
              {filtered.map((ticket) =>
                isAdmin ? (
                  <AdminTicketRow key={ticket.id} ticket={ticket} onClick={() => openTicket(ticket.id)} />
                ) : (
                  <TicketCard key={ticket.id} ticket={ticket} onClick={() => openTicket(ticket.id)} />
                )
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
