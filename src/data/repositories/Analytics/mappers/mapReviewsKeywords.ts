import type { ReviewsKeywordsDto } from "data/sources/Analytics"
import type { ReviewsKeywords } from "../types"
import { mapKeyCount } from "./mapKeyCount"

export const mapReviewsKeywords = (dto: ReviewsKeywordsDto): ReviewsKeywords => ({
  keywordsPositive: dto.keywords_positive.map(mapKeyCount),
  keywordsNegative: dto.keywords_negative.map(mapKeyCount),
})
