import styles from "./styles.module.scss"
import { PRIORITY_OPTIONS } from "./constants"
import type { AnalyticsFilterBarProps } from "./types"

export const AnalyticsFilterBar = ({
  filters,
  onChange,
  onReset,
  onSave,
  hideDates,
  hidePriority,
}: AnalyticsFilterBarProps) => (
  <div className={styles.bar}>
    {!hideDates && (
      <>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>С</span>
          <input
            type="date"
            className={styles.input}
            value={filters.date_from ?? ""}
            onChange={(e) => onChange({ date_from: e.target.value || undefined })}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>По</span>
          <input
            type="date"
            className={styles.input}
            value={filters.date_to ?? ""}
            onChange={(e) => onChange({ date_to: e.target.value || undefined })}
          />
        </label>
      </>
    )}
    <label className={styles.field}>
      <span className={styles.fieldLabel}>Продукт</span>
      <input
        type="text"
        className={styles.input}
        placeholder="Все продукты"
        value={filters.product ?? ""}
        onChange={(e) => onChange({ product: e.target.value || undefined })}
      />
    </label>
    {!hidePriority && (
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Приоритет</span>
        <select
          className={styles.input}
          value={filters.priority ?? ""}
          onChange={(e) => onChange({ priority: e.target.value || undefined })}
        >
          {PRIORITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>
    )}
    <label className={styles.field}>
      <span className={styles.fieldLabel}>Категория</span>
      <input
        type="text"
        className={styles.input}
        placeholder="Все категории"
        value={filters.category ?? ""}
        onChange={(e) => onChange({ category: e.target.value || undefined })}
      />
    </label>
    <div className={styles.actions}>
      <button className={styles.btnReset} onClick={onReset}>Сбросить</button>
      <button className={styles.btnSave} onClick={onSave}>Сохранить</button>
    </div>
  </div>
)

export type { AnalyticsFilterBarProps } from "./types"
