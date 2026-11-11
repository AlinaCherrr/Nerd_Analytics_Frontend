import { useRef } from "react"
import { useUsersDemographics, useUsersRetention } from "domain/Analytics"
import { useAnalyticsFilters } from "modules/AnalyticsFilterBar/useLogic"
import { getKpiHighlight } from "shared/utils/getKpiHighlight"
import {
  USERS_FILTERS_ID,
  TOP_CITIES_LIMIT,
  RETENTION_7D_SUCCESS_MIN_PCT,
  RETENTION_7D_WARNING_MIN_PCT,
  RETENTION_14D_SUCCESS_MIN_PCT,
  RETENTION_14D_WARNING_MIN_PCT,
  RETENTION_30D_SUCCESS_MIN_PCT,
  RETENTION_30D_WARNING_MIN_PCT,
} from "modules/AnalyticsUsersDashboard/constants"

export const useAnalyticsUsersDashboard = () => {
  const filterState = useAnalyticsFilters(USERS_FILTERS_ID)
  const demographics = useUsersDemographics(filterState.filters)
  const retention = useUsersRetention(filterState.filters)

  const genderRef = useRef<HTMLDivElement>(null)
  const ageRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)

  const totalUsers = demographics.data
    ? demographics.data.byGender.reduce((s, g) => s + g.count, 0)
    : null

  const topCities = (demographics.data?.byCity ?? []).slice(0, TOP_CITIES_LIMIT)

  const retentionHighlights = {
    d7: getKpiHighlight(
      retention.data?.retention7dPct,
      RETENTION_7D_SUCCESS_MIN_PCT,
      RETENTION_7D_WARNING_MIN_PCT,
    ),
    d14: getKpiHighlight(
      retention.data?.retention14dPct,
      RETENTION_14D_SUCCESS_MIN_PCT,
      RETENTION_14D_WARNING_MIN_PCT,
    ),
    d30: getKpiHighlight(
      retention.data?.retention30dPct,
      RETENTION_30D_SUCCESS_MIN_PCT,
      RETENTION_30D_WARNING_MIN_PCT,
    ),
  }

  return {
    filterState,
    demographics,
    retention,
    refs: { genderRef, ageRef, cityRef },
    totalUsers,
    topCities,
    retentionHighlights,
  }
}
