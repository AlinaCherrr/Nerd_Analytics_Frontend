import { reviewsSource } from "data/sources/Reviews"
import { mapReview } from "./mappers"
import type { ReviewsRepository } from "./types"

export const reviewsRealRepository: ReviewsRepository = {
  getReviews: async (params) => {
    const dtos = await reviewsSource.getReviews({ ticket_id: params?.ticketId })
    return dtos.map(mapReview)
  },

  getReview: async (id) => {
    const dto = await reviewsSource.getReview(id)
    return mapReview(dto)
  },

  createReview: async (input) => {
    const dto = await reviewsSource.createReview({
      ticket_id: input.ticketId,
      product: input.product,
      rating: input.rating,
      comment: input.comment,
    })
    return mapReview(dto)
  },

  updateReview: async (id, input) => {
    const dto = await reviewsSource.updateReview(id, {
      rating: input.rating,
      comment: input.comment,
      product: input.product,
      final_category: input.finalCategory,
      is_admin_changed: input.isAdminChanged,
    })
    return mapReview(dto)
  },
}
