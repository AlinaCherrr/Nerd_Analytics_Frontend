import { useState } from "react"
import {
  ANALYTICS_DASHBOARD_COMPONENTS,
  DEFAULT_ANALYTICS_DASHBOARD_ID,
} from "modules/AnalyticsDashboards/constants"
import type { AnalyticsDashboardId } from "modules/AnalyticsDashboards/types"

export const useAnalyticsDashboards = () => {
  const [activeId, setActiveId] = useState<AnalyticsDashboardId>(DEFAULT_ANALYTICS_DASHBOARD_ID)
  const ActiveDashboard = ANALYTICS_DASHBOARD_COMPONENTS[activeId]

  return { activeId, setActiveId, ActiveDashboard }
}
