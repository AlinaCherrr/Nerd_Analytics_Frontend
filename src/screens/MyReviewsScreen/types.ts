import type { ReviewSentiment } from "data/repositories/Reviews"

export type SentimentFilter = "all" | ReviewSentiment
export type RatingFilter = 0 | 1 | 2 | 3 | 4 | 5
