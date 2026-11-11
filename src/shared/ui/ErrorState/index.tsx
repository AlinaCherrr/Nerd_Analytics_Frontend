import { AlertTriangle } from "lucide-react"
import clsx from "clsx"
import styles from "./styles.module.scss"
import type { ErrorStateProps } from "./types"

export const ErrorState = ({
  title = "Не удалось загрузить данные",
  message,
  onRetry,
  retryLabel = "Повторить",
  compact,
}: ErrorStateProps) => (
  <div className={clsx(styles.root, compact && styles.compact)} role="alert">
    <AlertTriangle className={styles.icon} size={compact ? 18 : 28} />
    <p className={styles.title}>{title}</p>
    {message && <p className={styles.message}>{message}</p>}
    {onRetry && (
      <button type="button" className={styles.retry} onClick={onRetry}>
        {retryLabel}
      </button>
    )}
  </div>
)

export type { ErrorStateProps } from "./types"
