import { useRef } from "react"
import { useDashboard6Tickets, useTicketForecast } from "domain/Analytics"
import { useAnalyticsFilters } from "modules/AnalyticsFilterBar/useLogic"
import {
  TICKETS_ANALYSIS_FILTERS_ID,
  TICKETS_FORECAST_FILTERS_ID,
  ANOMALY_HIGH_Z_SCORE,
  ANOMALY_HIGH_Z_COLOR,
  ANOMALY_MODERATE_Z_COLOR,
} from "modules/AnalyticsTicketsDetailDashboard/constants"

export const useAnalyticsTicketsDetailDashboard = () => {
  const analysis = useAnalyticsFilters(TICKETS_ANALYSIS_FILTERS_ID)
  const forecast = useAnalyticsFilters(TICKETS_FORECAST_FILTERS_ID)

  const dashboard = useDashboard6Tickets(analysis.filters)
  const forecastQuery = useTicketForecast({
    product: forecast.filters.product,
    category: forecast.filters.category,
  })

  const forecastRef = useRef<HTMLDivElement>(null)

  const keywordRows = (dashboard.data?.topKeywords ?? []).map((w) => ({ key: w.word, count: w.count }))
  const categoryRows = (dashboard.data?.topCategories ?? []).map((c) => ({ key: c.category, count: c.count }))

  const getZScoreColor = (zScore: number) =>
    Math.abs(zScore) > ANOMALY_HIGH_Z_SCORE ? ANOMALY_HIGH_Z_COLOR : ANOMALY_MODERATE_Z_COLOR

  return {
    analysis,
    forecast,
    dashboard,
    forecastQuery,
    forecastRef,
    keywordRows,
    categoryRows,
    getZScoreColor,
  }
}
