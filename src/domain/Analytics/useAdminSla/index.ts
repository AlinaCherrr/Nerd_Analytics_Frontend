import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_ADMIN_SLA_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useAdminSla = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_ADMIN_SLA_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getAdminSla(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
