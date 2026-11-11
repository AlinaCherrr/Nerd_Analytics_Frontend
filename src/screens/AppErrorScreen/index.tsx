import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import styles from "./AppErrorScreen.module.scss"
import { useAppErrorScreen } from "./useLogic"

export const AppErrorScreen = () => {
  const {
    title, description, details, showDetails, isOutdated, handleReload, handleGoHome,
  } = useAppErrorScreen()

  return (
    <div className={styles.container} role="alert">
      <div className={styles.card}>
        <div className={styles.icon}>
          <AlertTriangle size={32} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={handleReload}>
            <RefreshCw size={16} />
            {isOutdated ? "Обновить" : "Перезагрузить"}
          </button>
          {!isOutdated && (
            <button type="button" className={styles.secondary} onClick={handleGoHome}>
              <Home size={16} />
              На главную
            </button>
          )}
        </div>

        {showDetails && (
          <details className={styles.details}>
            <summary>Подробности (dev)</summary>
            <pre>{details}</pre>
          </details>
        )}
      </div>
    </div>
  )
}
