import type { ReviewsSummaryDto } from "data/sources/Analytics"
import type { ReviewsSummary } from "../types"
import { mapKeyCount } from "./mapKeyCount"

export const mapReviewsSummary = (dto: ReviewsSummaryDto): ReviewsSummary => ({
  averageRating: dto.average_rating,
  totalReviews: dto.total_reviews,
  sentimentDistribution: dto.sentiment_distribution.map(mapKeyCount),
})
