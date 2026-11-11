import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_TICKET_TIMELINE_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useTicketTimeline = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_TICKET_TIMELINE_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getTicketTimeline(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
