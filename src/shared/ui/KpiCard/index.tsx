import clsx from "clsx"
import styles from "./styles.module.scss"
import type { KpiCardProps } from "./types"

export const KpiCard = ({ label, value, unit, highlight, placeholder }: KpiCardProps) => (
  <div className={clsx(styles.card, highlight && styles[highlight], placeholder && styles.placeholder)}>
    <span className={styles.label}>{label}</span>
    <div className={styles.valueRow}>
      <span className={styles.value}>{placeholder ? "—" : value}</span>
      {unit && !placeholder && <span className={styles.unit}>{unit}</span>}
    </div>
  </div>
)

export type { KpiCardProps, KpiHighlight } from "./types"
