import { IS_MOCK } from "shared/utils"
import { reviewsMockRepository } from "./mockRepository"
import { reviewsRealRepository } from "./realRepository"
import type { ReviewsRepository } from "./types"

export const reviewsRepository: ReviewsRepository = IS_MOCK
  ? reviewsMockRepository
  : reviewsRealRepository

export type { Review, ReviewSentiment, CreateReviewInput, UpdateReviewInput, ReviewsRepository } from "./types"
