import { reviewsMockSource } from "data/sources/Reviews/mock/mockSource"
import { mapReview } from "./mappers"
import type { ReviewsRepository } from "./types"

export const reviewsMockRepository: ReviewsRepository = {
  getReviews: async (params) => {
    const dtos = await reviewsMockSource.getReviews({ ticket_id: params?.ticketId })
    return dtos.map(mapReview)
  },

  getReview: async (id) => {
    const dto = await reviewsMockSource.getReview(id)
    return mapReview(dto)
  },

  createReview: async (input) => {
    const dto = await reviewsMockSource.createReview({
      ticket_id: input.ticketId,
      product: input.product,
      rating: input.rating,
      comment: input.comment,
    })
    return mapReview(dto)
  },

  updateReview: async (id, input) => {
    const dto = await reviewsMockSource.updateReview(id, {
      rating: input.rating,
      comment: input.comment,
      product: input.product,
      final_category: input.finalCategory,
      is_admin_changed: input.isAdminChanged,
    })
    return mapReview(dto)
  },
}
