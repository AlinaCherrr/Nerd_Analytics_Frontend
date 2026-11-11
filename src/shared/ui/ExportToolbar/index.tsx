import { Download } from "lucide-react"
import styles from "./styles.module.scss"
import type { ExportToolbarProps } from "./types"

export const ExportToolbar = ({ onExportCsv, onExportPng, onExportPdf }: ExportToolbarProps) => (
  <div className={styles.toolbar}>
    <Download size={14} className={styles.icon} />
    <button className={styles.btn} onClick={onExportCsv}>CSV</button>
    <button className={styles.btn} onClick={onExportPng}>PNG</button>
    <button className={styles.btn} onClick={onExportPdf}>PDF</button>
  </div>
)

export type { ExportToolbarProps } from "./types"
