import { ErrorBoundary } from "../ErrorBoundary"
import styles from "./styles.module.scss"
import type { ChartContainerProps } from "./types"

export const ChartContainer = ({
  title,
  isLoading,
  error,
  children,
  containerRef,
  minHeight = 280,
  wide,
  resetKey,
}: ChartContainerProps) => (
  <div className={`${styles.card}${wide ? ` ${styles.cardWide}` : ""}`}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.body} style={{ minHeight }} ref={containerRef}>
      {isLoading && (
        <div className={styles.loading}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      )}
      {!isLoading && error && (
        <div className={styles.error}>Ошибка загрузки данных</div>
      )}
      {!isLoading && !error && (
        <ErrorBoundary
          resetKeys={[resetKey]}
          fallback={() => <div className={styles.error}>Не удалось отобразить график</div>}
        >
          {children}
        </ErrorBoundary>
      )}
    </div>
  </div>
)

export type { ChartContainerProps } from "./types"
