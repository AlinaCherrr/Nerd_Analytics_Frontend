import { useState } from "react"
import { useReviews } from "domain/Reviews"
import type { RatingFilter, SentimentFilter } from "../types"

export const useMyReviewsScreen = () => {
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>("all")
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>(0)

  const { data: reviews = [], isLoading, isError, refetch } = useReviews()

  const filtered = reviews.filter((r) => {
    const sentimentOk =
      sentimentFilter === "all" || r.sentiment === sentimentFilter
    const ratingOk = ratingFilter === 0 || r.rating === ratingFilter
    return sentimentOk && ratingOk
  })

  const countBySentiment = (s: SentimentFilter) => {
    if (s === "all") return reviews.length
    return reviews.filter((r) => r.sentiment === s).length
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "—"

  const positiveCount = reviews.filter((r) => r.sentiment === "positive").length
  const negativeCount = reviews.filter((r) => r.sentiment === "negative").length

  return {
    sentimentFilter,
    setSentimentFilter,
    ratingFilter,
    setRatingFilter,
    reviews,
    isLoading,
    isError,
    retry: () => void refetch(),
    filtered,
    countBySentiment,
    avgRating,
    positiveCount,
    negativeCount,
  }
}
