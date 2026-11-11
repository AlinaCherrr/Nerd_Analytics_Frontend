import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_AI_ACCURACY_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"
import type { AnalyticsFilters } from "data/repositories/Analytics"

export const useAiAccuracy = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: [...ANALYTICS_AI_ACCURACY_QUERY_KEY, filters ?? {}],
    queryFn: () => analyticsRepository.getAiAccuracy(filters),
    staleTime: ANALYTICS_STALE_TIME,
  })
