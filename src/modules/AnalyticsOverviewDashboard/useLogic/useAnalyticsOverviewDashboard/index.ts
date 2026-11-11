import { useRef, useState } from "react"
import { useTicketSummary, useTicketTimeline } from "domain/Analytics"
import { useTicketStatuses } from "domain/TicketStatuses"
import { TICKET_STATUS } from "data/repositories/TicketStatuses"
import { useAnalyticsFilters } from "modules/AnalyticsFilterBar/useLogic"
import { OVERVIEW_FILTERS_ID } from "modules/AnalyticsOverviewDashboard/constants"

export const useAnalyticsOverviewDashboard = () => {
  const filterState = useAnalyticsFilters(OVERVIEW_FILTERS_ID)
  const summary = useTicketSummary(filterState.filters)
  const timeline = useTicketTimeline(filterState.filters)
  const { getLabel } = useTicketStatuses()

  const timelineRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)

  const [hiddenStatus, setHiddenStatus] = useState<Set<string>>(new Set())

  const totalTickets = summary.data?.byStatus.reduce((sum, s) => sum + s.count, 0) ?? 0
  const closedCount = summary.data?.byStatus.find((s) => s.key === TICKET_STATUS.closed)?.count ?? 0
  const openCount = totalTickets - closedCount

  const toggleStatus = (key: string) =>
    setHiddenStatus((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return {
    filterState,
    summary,
    timeline,
    getLabel,
    refs: { timelineRef, statusRef, productRef, categoryRef },
    hiddenStatus,
    toggleStatus,
    totalTickets,
    openCount,
  }
}
