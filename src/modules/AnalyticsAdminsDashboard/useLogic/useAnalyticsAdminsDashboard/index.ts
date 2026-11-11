import { useRef } from "react"
import { useSla, useAdminWorkload, useAdminSla } from "domain/Analytics"
import { useAnalyticsFilters } from "modules/AnalyticsFilterBar/useLogic"
import { getKpiHighlight } from "shared/utils/getKpiHighlight"
import { CHART_COLORS } from "shared/constants/charts"
import {
  ADMINS_FILTERS_ID,
  SLA_COMPLIANCE_SUCCESS_MIN,
  SLA_COMPLIANCE_WARNING_MIN,
  SLA_COMPLIANCE_SUCCESS_MIN_PCT,
  SLA_COMPLIANCE_WARNING_MIN_PCT,
} from "modules/AnalyticsAdminsDashboard/constants"

const average = (values: number[]) =>
  values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : null

export const useAnalyticsAdminsDashboard = () => {
  const filterState = useAnalyticsFilters(ADMINS_FILTERS_ID)
  const sla = useSla(filterState.filters)
  const workload = useAdminWorkload(filterState.filters)
  const adminSla = useAdminSla(filterState.filters)

  const slaPieRef = useRef<HTMLDivElement>(null)
  const workloadRef = useRef<HTMLDivElement>(null)
  const violationsRef = useRef<HTMLDivElement>(null)

  const byPriority = adminSla.data?.byPriority ?? []
  const avgTtfr = average(byPriority.map((p) => p.avgTtfr))
  const avgTtr = average(byPriority.map((p) => p.avgTtr))

  const pieData = [
    { key: "Соблюдено", count: sla.data?.compliant ?? 0 },
    { key: "Нарушено", count: sla.data?.breached ?? 0 },
  ]

  const workloadChartData = workload.data?.items.map((i) => ({
    name: i.username,
    open: i.openTickets,
    closed: i.closedTickets,
  })) ?? []

  const complianceHighlight = getKpiHighlight(
    sla.data?.complianceRate,
    SLA_COMPLIANCE_SUCCESS_MIN,
    SLA_COMPLIANCE_WARNING_MIN,
  )

  const getCompliancePctColor = (pct: number) => {
    if (pct >= SLA_COMPLIANCE_SUCCESS_MIN_PCT) return CHART_COLORS.green
    if (pct >= SLA_COMPLIANCE_WARNING_MIN_PCT) return CHART_COLORS.yellow
    return CHART_COLORS.red
  }

  return {
    filterState,
    sla,
    workload,
    adminSla,
    refs: { slaPieRef, workloadRef, violationsRef },
    avgTtfr,
    avgTtr,
    pieData,
    workloadChartData,
    complianceHighlight,
    getCompliancePctColor,
  }
}
