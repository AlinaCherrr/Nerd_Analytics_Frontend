import { delay } from "shared/utils/delay"
import type {
  AnalyticsParams,
  TicketSummaryDto,
  SlaDto,
  AiAccuracyDto,
  ReviewsSummaryDto,
  ReviewsKeywordsDto,
  TicketTimelineDto,
  AiEfficiencyDto,
  AdminWorkloadDto,
  AdminSlaDto,
  UserDemographicsDto,
  UserRetentionDto,
  ReviewDynamicsDto,
  TicketAnomaliesDto,
  TicketForecastDto,
  Dashboard6TicketsDto,
} from "../types"
import {
  MOCK_TICKET_SUMMARY_DTO,
  MOCK_SLA_DTO,
  MOCK_AI_ACCURACY_DTO,
  MOCK_REVIEWS_SUMMARY_DTO,
  MOCK_REVIEWS_KEYWORDS_DTO,
  MOCK_TICKET_TIMELINE_DTO,
  MOCK_AI_EFFICIENCY_DTO,
  MOCK_ADMIN_WORKLOAD_DTO,
  MOCK_ADMIN_SLA_DTO,
  MOCK_USER_DEMOGRAPHICS_DTO,
  MOCK_USER_RETENTION_DTO,
  MOCK_REVIEWS_DYNAMICS_DTO,
  MOCK_TICKET_ANOMALIES_DTO,
  MOCK_TICKET_FORECAST_DTO,
  MOCK_DASHBOARD6_TICKETS_DTO,
} from "./fixtures"

const RESPONSE_DELAY_MS = 300

const matches = (value: string, filter?: string) =>
  !filter || value.toLowerCase().includes(filter.trim().toLowerCase())

const filterByDate = <T extends { date: string }>(items: T[], params?: AnalyticsParams) =>
  items.filter(
    (item) => (!params?.date_from || item.date >= params.date_from) && (!params?.date_to || item.date <= params.date_to),
  )

const byCategory = <T extends { category: string }>(items: T[], params?: AnalyticsParams) =>
  items.filter((item) => matches(item.category, params?.category))

const byProductAndCategory = <T extends { category: string; product: string }>(
  items: T[],
  params?: AnalyticsParams,
) => items.filter((item) => matches(item.product, params?.product) && matches(item.category, params?.category))

export const analyticsMockSource = {
  getTicketSummary: async (params?: AnalyticsParams): Promise<TicketSummaryDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      by_status: [...MOCK_TICKET_SUMMARY_DTO.by_status],
      by_product: MOCK_TICKET_SUMMARY_DTO.by_product.filter((i) => matches(i.key, params?.product)),
      by_category: MOCK_TICKET_SUMMARY_DTO.by_category.filter((i) => matches(i.key, params?.category)),
    }
  },

  getSla: async (_params?: AnalyticsParams): Promise<SlaDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { ...MOCK_SLA_DTO }
  },

  getAiAccuracy: async (_params?: AnalyticsParams): Promise<AiAccuracyDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { ...MOCK_AI_ACCURACY_DTO }
  },

  getReviewsSummary: async (_params?: AnalyticsParams): Promise<ReviewsSummaryDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      ...MOCK_REVIEWS_SUMMARY_DTO,
      sentiment_distribution: [...MOCK_REVIEWS_SUMMARY_DTO.sentiment_distribution],
    }
  },

  getReviewsKeywords: async (_params?: AnalyticsParams): Promise<ReviewsKeywordsDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      keywords_positive: [...MOCK_REVIEWS_KEYWORDS_DTO.keywords_positive],
      keywords_negative: [...MOCK_REVIEWS_KEYWORDS_DTO.keywords_negative],
    }
  },

  getTicketTimeline: async (params?: AnalyticsParams): Promise<TicketTimelineDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { items: filterByDate(MOCK_TICKET_TIMELINE_DTO.items, params) }
  },

  getAiEfficiency: async (params?: AnalyticsParams): Promise<AiEfficiencyDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      ...MOCK_AI_EFFICIENCY_DTO,
      top_escalated_categories: byCategory(MOCK_AI_EFFICIENCY_DTO.top_escalated_categories, params),
      top_resolved_categories: byCategory(MOCK_AI_EFFICIENCY_DTO.top_resolved_categories, params),
    }
  },

  getAdminWorkload: async (_params?: AnalyticsParams): Promise<AdminWorkloadDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { items: [...MOCK_ADMIN_WORKLOAD_DTO.items] }
  },

  getAdminSla: async (params?: AnalyticsParams): Promise<AdminSlaDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      by_priority: MOCK_ADMIN_SLA_DTO.by_priority.filter((p) => !params?.priority || p.priority === params.priority),
      top_violated_categories: byCategory(MOCK_ADMIN_SLA_DTO.top_violated_categories, params),
    }
  },

  getUserDemographics: async (_params?: AnalyticsParams): Promise<UserDemographicsDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      by_gender: [...MOCK_USER_DEMOGRAPHICS_DTO.by_gender],
      by_age_group: [...MOCK_USER_DEMOGRAPHICS_DTO.by_age_group],
      by_city: [...MOCK_USER_DEMOGRAPHICS_DTO.by_city],
    }
  },

  getUserRetention: async (_params?: AnalyticsParams): Promise<UserRetentionDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { ...MOCK_USER_RETENTION_DTO }
  },

  getReviewsDynamics: async (params?: AnalyticsParams): Promise<ReviewDynamicsDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { items: filterByDate(MOCK_REVIEWS_DYNAMICS_DTO.items, params) }
  },

  getTicketAnomalies: async (params?: AnalyticsParams): Promise<TicketAnomaliesDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { items: byProductAndCategory(MOCK_TICKET_ANOMALIES_DTO.items, params) }
  },

  getTicketForecast: async (_params?: Pick<AnalyticsParams, "product" | "category">): Promise<TicketForecastDto> => {
    await delay(RESPONSE_DELAY_MS)
    return { forecast: [...MOCK_TICKET_FORECAST_DTO.forecast] }
  },

  getDashboard6Tickets: async (params?: AnalyticsParams): Promise<Dashboard6TicketsDto> => {
    await delay(RESPONSE_DELAY_MS)
    return {
      ...MOCK_DASHBOARD6_TICKETS_DTO,
      top_categories: byCategory(MOCK_DASHBOARD6_TICKETS_DTO.top_categories, params),
      dynamics: filterByDate(MOCK_DASHBOARD6_TICKETS_DTO.dynamics, params),
      anomalies: byProductAndCategory(MOCK_DASHBOARD6_TICKETS_DTO.anomalies, params),
      slowest_categories: byCategory(MOCK_DASHBOARD6_TICKETS_DTO.slowest_categories, params),
    }
  },
}
