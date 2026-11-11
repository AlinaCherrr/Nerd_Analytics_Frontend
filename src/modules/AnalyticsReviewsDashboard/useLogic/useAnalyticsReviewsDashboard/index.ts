import { useRef } from "react"
import { useReviewsSummary, useReviewsKeywords, useReviewsDynamics } from "domain/Analytics"
import { useAnalyticsFilters } from "modules/AnalyticsFilterBar/useLogic"
import { getKpiHighlight } from "shared/utils/getKpiHighlight"
import {
  REVIEWS_FILTERS_ID,
  RATING_SUCCESS_MIN,
  RATING_WARNING_MIN,
} from "modules/AnalyticsReviewsDashboard/constants"

export const useAnalyticsReviewsDashboard = () => {
  const filterState = useAnalyticsFilters(REVIEWS_FILTERS_ID)
  const summary = useReviewsSummary(filterState.filters)
  const keywords = useReviewsKeywords(filterState.filters)
  const dynamics = useReviewsDynamics(filterState.filters)

  const sentimentRef = useRef<HTMLDivElement>(null)
  const dynamicsRef = useRef<HTMLDivElement>(null)

  const ratingHighlight = getKpiHighlight(
    summary.data?.averageRating,
    RATING_SUCCESS_MIN,
    RATING_WARNING_MIN,
  )

  return {
    filterState,
    summary,
    keywords,
    dynamics,
    refs: { sentimentRef, dynamicsRef },
    ratingHighlight,
  }
}
