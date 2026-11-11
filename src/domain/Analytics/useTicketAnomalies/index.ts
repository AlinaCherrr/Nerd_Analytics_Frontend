import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_TICKET_ANOMALIES_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useTicketAnomalies = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_TICKET_ANOMALIES_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getTicketAnomalies(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
