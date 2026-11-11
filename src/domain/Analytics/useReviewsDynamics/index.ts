import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_REVIEWS_DYNAMICS_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useReviewsDynamics = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_REVIEWS_DYNAMICS_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getReviewsDynamics(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
