import clsx from "clsx"
import { ErrorBoundary } from "shared/ui/ErrorBoundary"
import { ErrorState } from "shared/ui/ErrorState"
import { ANALYTICS_DASHBOARD_TABS } from "./constants"
import { useAnalyticsDashboards } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsDashboards = () => {
  const { activeId, setActiveId, ActiveDashboard } = useAnalyticsDashboards()

  return (
    <>
      <div className={styles.tabs}>
        {ANALYTICS_DASHBOARD_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={clsx(styles.tab, activeId === id && styles.tabActive)}
            onClick={() => setActiveId(id)}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <ErrorBoundary
          resetKeys={[activeId]}
          fallback={({ reset }) => (
            <ErrorState
              title="Не удалось отобразить дашборд"
              message="Попробуйте ещё раз или переключитесь на другую вкладку."
              onRetry={reset}
            />
          )}
        >
          <ActiveDashboard />
        </ErrorBoundary>
      </div>
    </>
  )
}

export type { AnalyticsDashboardId, AnalyticsDashboardTab } from "./types"
