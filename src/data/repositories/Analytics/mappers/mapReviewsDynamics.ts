import type { ReviewDynamicsDto } from "data/sources/Analytics"
import type { ReviewDynamics } from "../types"

export const mapReviewsDynamics = (dto: ReviewDynamicsDto): ReviewDynamics => ({
  items: dto.items.map((i) => ({
    date: i.date,
    positiveCount: i.positive_count,
    negativeCount: i.negative_count,
  })),
})
