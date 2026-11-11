export type KpiHighlight = "success" | "warning" | "danger"

export interface KpiCardProps {
  label: string
  value: string | number
  unit?: string
  highlight?: KpiHighlight
  placeholder?: boolean
}
