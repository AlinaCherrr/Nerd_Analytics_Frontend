export const ANALYTICS_QUERY_KEY = ["analytics"] as const
export const ANALYTICS_STALE_TIME = 60 * 1000

export const ANALYTICS_ADMIN_SLA_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "adminSla"] as const
export const ANALYTICS_ADMIN_WORKLOAD_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "adminWorkload"] as const
export const ANALYTICS_AI_ACCURACY_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "aiAccuracy"] as const
export const ANALYTICS_AI_EFFICIENCY_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "aiEfficiency"] as const
export const ANALYTICS_DASHBOARD_6_TICKETS_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "dashboard6Tickets"] as const
export const ANALYTICS_REVIEWS_DYNAMICS_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "reviewsDynamics"] as const
export const ANALYTICS_REVIEWS_KEYWORDS_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "reviewsKeywords"] as const
export const ANALYTICS_REVIEWS_SUMMARY_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "reviewsSummary"] as const
export const ANALYTICS_SLA_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "sla"] as const
export const ANALYTICS_TICKET_ANOMALIES_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "ticketAnomalies"] as const
export const ANALYTICS_TICKET_FORECAST_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "ticketForecast"] as const
export const ANALYTICS_TICKET_SUMMARY_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "ticketSummary"] as const
export const ANALYTICS_TICKET_TIMELINE_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "ticketTimeline"] as const
export const ANALYTICS_USERS_DEMOGRAPHICS_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "usersDemographics"] as const
export const ANALYTICS_USERS_RETENTION_QUERY_KEY = [...ANALYTICS_QUERY_KEY, "usersRetention"] as const
