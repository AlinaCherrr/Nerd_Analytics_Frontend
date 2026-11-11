import { CHART_COLORS } from "shared/constants/charts"

export const ADMINS_FILTERS_ID = "admins"

export const SLA_PIE_COLORS = [CHART_COLORS.green, CHART_COLORS.red]
export const OPEN_TICKETS_COLOR = CHART_COLORS.yellow
export const CLOSED_TICKETS_COLOR = CHART_COLORS.green

export const PRIORITY_LABELS: Record<string, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
}

export const SLA_COMPLIANCE_SUCCESS_MIN = 0.9
export const SLA_COMPLIANCE_WARNING_MIN = 0.7
export const SLA_COMPLIANCE_SUCCESS_MIN_PCT = 90
export const SLA_COMPLIANCE_WARNING_MIN_PCT = 70
