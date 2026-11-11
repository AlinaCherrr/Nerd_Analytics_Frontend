import { Sidebar, UserMenu, AnalyticsDashboards } from "modules"
import styles from "./styles.module.scss"

export const AnalyticsScreen = () => (
  <div className={styles.page}>
    <Sidebar />
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Аналитика</h1>
        <UserMenu />
      </div>

      <AnalyticsDashboards />
    </main>
  </div>
)
