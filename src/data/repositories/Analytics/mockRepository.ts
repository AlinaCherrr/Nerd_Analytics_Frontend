import { analyticsMockSource } from "data/sources/Analytics/mock/mockSource"
import {
  mapTicketSummary,
  mapSla,
  mapAiAccuracy,
  mapReviewsSummary,
  mapReviewsKeywords,
  mapTicketTimeline,
  mapAiEfficiency,
  mapAdminWorkload,
  mapAdminSla,
  mapUserDemographics,
  mapUserRetention,
  mapReviewsDynamics,
  mapTicketAnomalies,
  mapTicketForecast,
  mapDashboard6Tickets,
} from "./mappers"
import type { AnalyticsRepository } from "./types"

export const analyticsMockRepository: AnalyticsRepository = {
  getTicketSummary: async (filters) => mapTicketSummary(await analyticsMockSource.getTicketSummary(filters)),

  getSla: async (filters) => mapSla(await analyticsMockSource.getSla(filters)),

  getAiAccuracy: async (filters) => mapAiAccuracy(await analyticsMockSource.getAiAccuracy(filters)),

  getReviewsSummary: async (filters) => mapReviewsSummary(await analyticsMockSource.getReviewsSummary(filters)),

  getReviewsKeywords: async (filters) => mapReviewsKeywords(await analyticsMockSource.getReviewsKeywords(filters)),

  getTicketTimeline: async (filters) => mapTicketTimeline(await analyticsMockSource.getTicketTimeline(filters)),

  getAiEfficiency: async (filters) => mapAiEfficiency(await analyticsMockSource.getAiEfficiency(filters)),

  getAdminWorkload: async (filters) => mapAdminWorkload(await analyticsMockSource.getAdminWorkload(filters)),

  getAdminSla: async (filters) => mapAdminSla(await analyticsMockSource.getAdminSla(filters)),

  getUserDemographics: async (filters) => mapUserDemographics(await analyticsMockSource.getUserDemographics(filters)),

  getUserRetention: async (filters) => mapUserRetention(await analyticsMockSource.getUserRetention(filters)),

  getReviewsDynamics: async (filters) => mapReviewsDynamics(await analyticsMockSource.getReviewsDynamics(filters)),

  getTicketAnomalies: async (filters) => mapTicketAnomalies(await analyticsMockSource.getTicketAnomalies(filters)),

  getTicketForecast: async (params) => mapTicketForecast(await analyticsMockSource.getTicketForecast(params)),

  getDashboard6Tickets: async (filters) => mapDashboard6Tickets(await analyticsMockSource.getDashboard6Tickets(filters)),
}
