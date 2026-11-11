import type { AnalyticsFilters } from "data/repositories/Analytics"

export interface AnalyticsFilterBarProps {
  filters: AnalyticsFilters
  onChange: (next: Partial<AnalyticsFilters>) => void
  onReset: () => void
  onSave: () => void
  hideDates?: boolean
  hidePriority?: boolean
}
