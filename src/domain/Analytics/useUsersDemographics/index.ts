import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_USERS_DEMOGRAPHICS_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useUsersDemographics = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_USERS_DEMOGRAPHICS_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getUserDemographics(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
