import { IS_MOCK } from "shared/utils"
import { analyticsMockRepository } from "./mockRepository"
import { analyticsRealRepository } from "./realRepository"
import type { AnalyticsRepository } from "./types"

export const analyticsRepository: AnalyticsRepository = IS_MOCK
  ? analyticsMockRepository
  : analyticsRealRepository

export type {
  KeyCount,
  TicketSummary,
  Sla,
  AiAccuracy,
  ReviewsSummary,
  ReviewsKeywords,
  AnalyticsFilters,
  TicketTimeline,
  TimelineItem,
  AiEfficiency,
  CategoryCount,
  AdminWorkload,
  AdminWorkloadItem,
  AdminSla,
  SlaPriorityItem,
  UserDemographics,
  DemographicsCountItem,
  UserRetention,
  ReviewDynamics,
  ReviewDynamicsItem,
  TicketAnomalies,
  TicketAnomalyItem,
  TicketForecast,
  ForecastItem,
  Dashboard6Tickets,
  WordCount,
  SlowestCategory,
  DashboardAnomalyItem,
  AnalyticsRepository,
} from "./types"
