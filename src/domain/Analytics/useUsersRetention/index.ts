import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_USERS_RETENTION_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useUsersRetention = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_USERS_RETENTION_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getUserRetention(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
