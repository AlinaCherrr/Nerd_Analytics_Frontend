import type { SentimentFilter } from "./types"

export const SENTIMENT_FILTERS: { value: SentimentFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "positive", label: "Позитивные" },
  { value: "neutral", label: "Нейтральные" },
  { value: "negative", label: "Негативные" },
]

export const RATING_OPTIONS = [1, 2, 3, 4, 5] as const
