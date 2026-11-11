import { useRef } from "react"
import { useAiAccuracy, useAiEfficiency } from "domain/Analytics"
import { useAnalyticsFilters } from "modules/AnalyticsFilterBar/useLogic"
import { getKpiHighlight } from "shared/utils/getKpiHighlight"
import {
  AI_FILTERS_ID,
  ACCURACY_SUCCESS_MIN,
  ACCURACY_WARNING_MIN,
  AUTO_RESOLVED_SUCCESS_MIN_PCT,
  AUTO_RESOLVED_WARNING_MIN_PCT,
} from "modules/AnalyticsAiDashboard/constants"

export const useAnalyticsAiDashboard = () => {
  const filterState = useAnalyticsFilters(AI_FILTERS_ID)
  const accuracy = useAiAccuracy(filterState.filters)
  const efficiency = useAiEfficiency(filterState.filters)

  const classificationRef = useRef<HTMLDivElement>(null)
  const escalatedRef = useRef<HTMLDivElement>(null)
  const resolvedRef = useRef<HTMLDivElement>(null)

  const autoCount = (accuracy.data?.totalClassified ?? 0) - (accuracy.data?.adminChanged ?? 0)
  const pieData = [
    { key: "Автоматически", count: autoCount },
    { key: "Изменено вручную", count: accuracy.data?.adminChanged ?? 0 },
  ]

  const accuracyHighlight = getKpiHighlight(
    accuracy.data?.accuracyRate,
    ACCURACY_SUCCESS_MIN,
    ACCURACY_WARNING_MIN,
  )
  const autoResolvedHighlight = getKpiHighlight(
    efficiency.data?.autoResolvedPct,
    AUTO_RESOLVED_SUCCESS_MIN_PCT,
    AUTO_RESOLVED_WARNING_MIN_PCT,
  )

  return {
    filterState,
    accuracy,
    efficiency,
    refs: { classificationRef, escalatedRef, resolvedRef },
    pieData,
    accuracyHighlight,
    autoResolvedHighlight,
  }
}
