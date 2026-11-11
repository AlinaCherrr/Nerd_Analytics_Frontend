import { useQuery } from "@tanstack/react-query"
import { analyticsRepository } from "data/repositories/Analytics"
import { ANALYTICS_TICKET_FORECAST_QUERY_KEY, ANALYTICS_STALE_TIME } from "../constants"

export const useTicketForecast = (params?: { product?: string; category?: string }) =>
  useQuery({
    queryKey: [...ANALYTICS_TICKET_FORECAST_QUERY_KEY, params ?? {}],
    queryFn: () => analyticsRepository.getTicketForecast(params),
    staleTime: ANALYTICS_STALE_TIME,
  })
