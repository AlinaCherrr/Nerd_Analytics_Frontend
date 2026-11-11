import { useQuery } from "@tanstack/react-query"
import { reviewsRepository } from "data/repositories/Reviews"
import { REVIEWS_QUERY_KEY, REVIEWS_STALE_TIME } from "../constants"

export const useReviews = (params?: { ticketId?: string }) => {
  return useQuery({
    queryKey: [...REVIEWS_QUERY_KEY, params],
    queryFn: () => reviewsRepository.getReviews(params),
    staleTime: REVIEWS_STALE_TIME,
  })
}
