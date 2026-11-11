import { ApiError } from "shared/http"
import { delay } from "shared/utils/delay"
import type { CreateReviewRequest, ReviewDto, UpdateReviewRequest } from "../types"
import { MOCK_REVIEW_DTOS } from "./fixtures"

const store: ReviewDto[] = [...MOCK_REVIEW_DTOS]

export const reviewsMockSource = {
  getReviews: async (params?: { ticket_id?: string }): Promise<ReviewDto[]> => {
    await delay(300)
    if (!params?.ticket_id) return [...store]
    return store.filter((r) => r.ticket_id === params.ticket_id)
  },

  getReview: async (id: string): Promise<ReviewDto> => {
    await delay(200)
    const review = store.find((r) => r.id === id)
    if (!review) throw new ApiError(`Отзыв ${id} не найден`, 404)
    return { ...review }
  },

  createReview: async (req: CreateReviewRequest): Promise<ReviewDto> => {
    await delay(300)
    const review: ReviewDto = {
      id: `review-${Date.now()}`,
      ticket_id: req.ticket_id ?? null,
      client_id: "mock-user-id",
      product: req.product ?? null,
      rating: req.rating,
      comment: req.comment ?? null,
      created_at: new Date().toISOString(),
      ai_suggested_category: null,
      final_category: null,
      is_admin_changed: false,
      sentiment: null,
      keywords_positive: [],
      keywords_neutral: [],
      keywords_negative: [],
      confidence: null,
    }
    store.unshift(review)
    return { ...review }
  },

  updateReview: async (id: string, req: UpdateReviewRequest): Promise<ReviewDto> => {
    await delay(200)
    const idx = store.findIndex((r) => r.id === id)
    if (idx === -1) throw new ApiError(`Отзыв ${id} не найден`, 404)
    store[idx] = {
      ...store[idx],
      ...(req.rating !== undefined && { rating: req.rating }),
      ...(req.comment !== undefined && { comment: req.comment }),
      ...(req.product !== undefined && { product: req.product }),
      ...(req.final_category !== undefined && { final_category: req.final_category }),
      ...(req.is_admin_changed !== undefined && { is_admin_changed: req.is_admin_changed }),
    }
    return { ...store[idx] }
  },
}
