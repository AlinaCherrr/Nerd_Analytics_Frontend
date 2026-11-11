import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_TICKET_SUMMARY_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useTicketSummary = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_TICKET_SUMMARY_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getTicketSummary(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
