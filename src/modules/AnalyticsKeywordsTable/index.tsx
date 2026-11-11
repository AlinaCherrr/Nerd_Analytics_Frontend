import styles from "./styles.module.scss"
import type { AnalyticsKeywordsTableProps } from "./types"

export const AnalyticsKeywordsTable = ({
  data,
  isLoading,
  accentColor,
  keyTitle,
  countTitle,
}: AnalyticsKeywordsTableProps) => {
  if (isLoading) return <div className={styles.message}>Загрузка…</div>
  if (!data.length) return <div className={styles.message}>Нет данных</div>

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{keyTitle}</th>
          <th>{countTitle}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.key}>
            <td style={{ color: accentColor }}>{row.key}</td>
            <td>{row.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export type { AnalyticsKeywordsTableProps, AnalyticsKeywordsTableRow } from "./types"
