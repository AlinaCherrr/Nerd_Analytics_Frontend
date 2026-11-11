import { analyticsSource } from "data/sources/Analytics"
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

export const analyticsRealRepository: AnalyticsRepository = {
  getTicketSummary: async (filters) => mapTicketSummary(await analyticsSource.getTicketSummary(filters)),

  getSla: async (filters) => mapSla(await analyticsSource.getSla(filters)),

  getAiAccuracy: async (filters) => mapAiAccuracy(await analyticsSource.getAiAccuracy(filters)),

  getReviewsSummary: async (filters) => mapReviewsSummary(await analyticsSource.getReviewsSummary(filters)),

  getReviewsKeywords: async (filters) => mapReviewsKeywords(await analyticsSource.getReviewsKeywords(filters)),

  getTicketTimeline: async (filters) => mapTicketTimeline(await analyticsSource.getTicketTimeline(filters)),

  getAiEfficiency: async (filters) => mapAiEfficiency(await analyticsSource.getAiEfficiency(filters)),

  getAdminWorkload: async (filters) => mapAdminWorkload(await analyticsSource.getAdminWorkload(filters)),

  getAdminSla: async (filters) => mapAdminSla(await analyticsSource.getAdminSla(filters)),

  getUserDemographics: async (filters) => mapUserDemographics(await analyticsSource.getUserDemographics(filters)),

  getUserRetention: async (filters) => mapUserRetention(await analyticsSource.getUserRetention(filters)),

  getReviewsDynamics: async (filters) => mapReviewsDynamics(await analyticsSource.getReviewsDynamics(filters)),

  getTicketAnomalies: async (filters) => mapTicketAnomalies(await analyticsSource.getTicketAnomalies(filters)),

  getTicketForecast: async (params) => mapTicketForecast(await analyticsSource.getTicketForecast(params)),

  getDashboard6Tickets: async (filters) => mapDashboard6Tickets(await analyticsSource.getDashboard6Tickets(filters)),
}
