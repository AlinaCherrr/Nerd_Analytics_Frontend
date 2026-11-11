import {
 Bot, User2, CheckCircle, Clock, AlertTriangle 
} from "lucide-react"
import styles from "./AssistantScreen.module.scss"
import { Sidebar, UserMenu } from "modules"
import { ChatHistory } from "modules/ChatHistory"
import { ChatMessage } from "modules/ChatMessage"
import { ChatInput } from "modules/ChatInput"
import { ErrorBoundary } from "shared/ui/ErrorBoundary"
import { ErrorState } from "shared/ui/ErrorState"
import { useAssistantScreen } from "./useLogic"

export const AssistantScreen = () => {
  const {
    sessions,
    sessionsLoading,
    sessionsError,
    refetchSessions,
    effectiveSessionId,
    activeSession,
    ticketTitle,
    inputValue,
    setInputValue,
    pendingFirstMessage,
    messagesLoading,
    messagesError,
    refetchMessages,
    chatError,
    uniqueMessages,
    messagesEndRef,
    isSending,
    isChatClosed,
    isWaitingForOperator,
    isChatBlocked,
    showResolveButton,
    isResolving,
    handleSend,
    handleNewChat,
    handleSelectSession,
    handleResolve,
  } = useAssistantScreen()

  return (
    <div className={styles.page}>
      <Sidebar />
      <ErrorBoundary
        resetKeys={[sessions]}
        fallback={({ reset }) => (
          <ErrorState compact title="Не удалось отобразить историю чатов" onRetry={reset} />
        )}
      >
        <ChatHistory
          sessions={sessions}
          activeSessionId={effectiveSessionId}
          isLoading={sessionsLoading}
          isError={sessionsError}
          onRetry={refetchSessions}
          onSelect={handleSelectSession}
          onNewChat={handleNewChat}
        />
      </ErrorBoundary>

      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <div className={styles.chatTitle}>
            {activeSession ? (
              <h1 className={styles.sessionTitle}>{ticketTitle ?? activeSession.title}</h1>
            ) : (
              <h1 className={styles.sessionTitle}>Новый чат</h1>
            )}
          </div>
          <UserMenu />
        </div>

        <div className={styles.messagesArea}>
          <ErrorBoundary
            resetKeys={[effectiveSessionId]}
            fallback={({ reset }) => (
              <ErrorState
                title="Не удалось отобразить переписку"
                message="Попробуйте ещё раз или откройте другой чат."
                onRetry={reset}
              />
            )}
          >
          {!effectiveSessionId && !isSending && !pendingFirstMessage && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Bot size={40} />
              </div>
              <h2 className={styles.emptyTitle}>Чем могу помочь?</h2>
              <p className={styles.emptySubtitle}>
                Опишите вашу проблему — я постараюсь помочь
              </p>
            </div>
          )}

          {messagesLoading && (
            <div className={styles.loadingMessages}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          )}

          {!messagesLoading && messagesError && (
            <ErrorState title="Не удалось загрузить сообщения" onRetry={refetchMessages} />
          )}

          {!messagesLoading &&
            uniqueMessages.map((message) => (
              <ErrorBoundary
                key={message.id}
                fallback={() => (
                  <div className={styles.brokenMessage}>Не удалось отобразить сообщение</div>
                )}
              >
                <ChatMessage message={message} />
              </ErrorBoundary>
            ))}

          {pendingFirstMessage && (
            <div className={styles.pendingUserMessage}>
              <div className={styles.pendingBubble}>
                <p className={styles.pendingText}>{pendingFirstMessage}</p>
              </div>
              <div className={styles.pendingAvatar}>
                <User2 size={18} />
              </div>
            </div>
          )}

          {isSending && (
            <div className={styles.typingIndicator}>
              <div className={styles.typingAvatar}>
                <Bot size={16} />
              </div>
              <div className={styles.typingBubble}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            </div>
          )}

          {isChatClosed && (
            <div className={`${styles.systemBanner} ${styles.bannerClosed}`}>
              <CheckCircle size={16} />
              Рад помочь! Обращение закрыто.
            </div>
          )}

          {isWaitingForOperator && (
            <div className={`${styles.systemBanner} ${styles.bannerWaiting}`}>
              <Clock size={16} />
              Обращение передано оператору. Ожидайте ответа.
            </div>
          )}

          {chatError && (
            <div className={`${styles.systemBanner} ${styles.bannerError}`} role="alert">
              <AlertTriangle size={16} />
              {chatError}
            </div>
          )}

          {showResolveButton && (
            <div className={styles.resolveBar}>
              <button
                className={styles.resolveButton}
                onClick={handleResolve}
                disabled={isResolving}
              >
                {isResolving ? "Закрываем..." : "✓ Проблема решена"}
              </button>
            </div>
          )}

          </ErrorBoundary>
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSend}
          disabled={isChatBlocked}
          loading={isSending}
        />
      </main>
    </div>
  )
}
