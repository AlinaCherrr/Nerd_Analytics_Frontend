import { MessageSquare, Plus } from "lucide-react"
import clsx from "clsx"
import styles from "./styles.module.scss"
import type { ChatHistoryProps } from "./types"
import { useChatHistory } from "./useLogic/useChatHistory"
import { HISTORY_TITLE, NEW_CHAT_LABEL, STATUS_CLASS } from "./constants"
import { useTicketStatuses } from "domain/TicketStatuses"
import { ErrorState } from "shared/ui/ErrorState"

export const ChatHistory = ({
  sessions,
  activeSessionId,
  isLoading,
  isError,
  onRetry,
  onSelect,
  onNewChat,
}: ChatHistoryProps) => {
  const { handleSelect, handleNewChat } = useChatHistory({ onSelect, onNewChat })
  const { getLabel } = useTicketStatuses()

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{HISTORY_TITLE}</span>
        <button
          className={styles.newChatButton}
          onClick={handleNewChat}
          title={NEW_CHAT_LABEL}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className={styles.list}>
        {isLoading && (
          <div className={styles.loading}>
            <span className={styles.loadingDot} />
            <span className={styles.loadingDot} />
            <span className={styles.loadingDot} />
          </div>
        )}

        {!isLoading && isError && (
          <ErrorState compact title="Не удалось загрузить чаты" onRetry={onRetry} />
        )}

        {!isLoading && !isError && sessions.length === 0 && (
          <p className={styles.empty}>Нет чатов</p>
        )}

        {!isLoading &&
          sessions.map((session) => {
            const statusLabel = session.ticketStatus ? getLabel(session.ticketStatus) : undefined
            const statusClass = session.ticketStatus ? STATUS_CLASS[session.ticketStatus] : undefined

            return (
              <button
                key={session.id}
                className={clsx(
                  styles.item,
                  session.id === activeSessionId && styles.itemActive,
                )}
                onClick={() => handleSelect(session.id)}
              >
                <MessageSquare size={16} className={styles.itemIcon} />
                <div className={styles.itemContent}>
                  <div className={styles.itemTitleRow}>
                    <span className={styles.itemTitle}>{session.title}</span>
                    {statusLabel && statusClass && (
                      <span className={clsx(styles.itemStatus, statusClass)}>{statusLabel}</span>
                    )}
                  </div>
                  {session.lastMessage && (
                    <span className={styles.itemPreview}>{session.lastMessage}</span>
                  )}
                </div>
              </button>
            )
          })}
      </div>
    </aside>
  )
}
