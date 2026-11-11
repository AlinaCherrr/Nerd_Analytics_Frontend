import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reviewsRepository } from "data/repositories/Reviews"
import type { CreateReviewInput } from "data/repositories/Reviews"
import { REVIEWS_QUERY_KEY } from "../constants"

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateReviewInput) => reviewsRepository.createReview(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY })
    },
  })
}
