import type {
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

const SERIES_START = Date.UTC(2026, 4, 8)
const FORECAST_START = Date.UTC(2026, 5, 7)
const DAY_MS = 24 * 60 * 60 * 1000

const toDate = (start: number, offset: number) => new Date(start + offset * DAY_MS).toISOString().slice(0, 10)

const TIMELINE_COUNTS = [
  2, 4, 3, 5, 3, 1, 2, 4, 6, 3, 4, 2, 1, 3, 5, 7, 4, 3, 2, 1, 4, 3, 6, 5, 3, 2, 1, 4, 5, 3,
]

const REVIEWS_POSITIVE_COUNTS = [
  4, 5, 3, 6, 4, 2, 3, 5, 6, 4, 5, 3, 2, 4, 6, 7, 5, 4, 3, 2, 5, 4, 6, 5, 4, 3, 2, 5, 6, 4,
]

const REVIEWS_NEGATIVE_COUNTS = [
  1, 2, 1, 3, 2, 1, 1, 2, 4, 2, 1, 1, 0, 2, 3, 5, 2, 1, 1, 0, 2, 1, 3, 2, 1, 1, 0, 1, 2, 1,
]

export const MOCK_TICKET_SUMMARY_DTO: TicketSummaryDto = {
  by_status: [
    { key: "in_progress", count: 18 },
    { key: "waiting_for_operator", count: 9 },
    { key: "in_operator_processing", count: 12 },
    { key: "reopened", count: 4 },
    { key: "closed", count: 57 },
  ],
  by_product: [
    { key: "веб-сервис", count: 28 },
    { key: "мобильное приложение", count: 24 },
    { key: "личный кабинет", count: 16 },
    { key: "платёжный сервис", count: 14 },
    { key: "API интеграция", count: 10 },
    { key: "аналитический модуль", count: 8 },
  ],
  by_category: [
    { key: "технический сбой", count: 31 },
    { key: "вопрос по оплате", count: 19 },
    { key: "проблема с доступом", count: 17 },
    { key: "консультация", count: 15 },
    { key: "жалоба на сервис", count: 11 },
    { key: "предложение по улучшению", count: 7 },
  ],
}

export const MOCK_SLA_DTO: SlaDto = {
  total: 100,
  breached: 18,
  compliant: 82,
  compliance_rate: 0.82,
}

export const MOCK_AI_ACCURACY_DTO: AiAccuracyDto = {
  total_classified: 100,
  admin_changed: 9,
  accuracy_rate: 0.91,
}

export const MOCK_REVIEWS_SUMMARY_DTO: ReviewsSummaryDto = {
  average_rating: 3.9,
  total_reviews: 240,
  sentiment_distribution: [
    { key: "positive", count: 138 },
    { key: "neutral", count: 54 },
    { key: "negative", count: 48 },
  ],
}

export const MOCK_REVIEWS_KEYWORDS_DTO: ReviewsKeywordsDto = {
  keywords_positive: [
    { key: "быстро", count: 42 },
    { key: "вежливо", count: 35 },
    { key: "удобно", count: 28 },
    { key: "помогли", count: 24 },
    { key: "понятно", count: 17 },
    { key: "спасибо", count: 15 },
  ],
  keywords_negative: [
    { key: "долго", count: 26 },
    { key: "не решили", count: 18 },
    { key: "ошибка", count: 14 },
    { key: "непонятно", count: 9 },
    { key: "перезвонили", count: 6 },
  ],
}

export const MOCK_TICKET_TIMELINE_DTO: TicketTimelineDto = {
  items: TIMELINE_COUNTS.map((count, i) => ({ date: toDate(SERIES_START, i), count })),
}

export const MOCK_AI_EFFICIENCY_DTO: AiEfficiencyDto = {
  auto_resolved: 38,
  escalated: 62,
  auto_resolved_pct: 38.0,
  avg_messages_before_escalation: 4.3,
  top_escalated_categories: [
    { category: "технический сбой", count: 22 },
    { category: "проблема с доступом", count: 14 },
    { category: "жалоба на сервис", count: 11 },
    { category: "вопрос по оплате", count: 9 },
    { category: "предложение по улучшению", count: 6 },
  ],
  top_resolved_categories: [
    { category: "консультация", count: 13 },
    { category: "вопрос по оплате", count: 10 },
    { category: "технический сбой", count: 9 },
    { category: "проблема с доступом", count: 3 },
    { category: "жалоба на сервис", count: 2 },
    { category: "предложение по улучшению", count: 1 },
  ],
}

export const MOCK_ADMIN_WORKLOAD_DTO: AdminWorkloadDto = {
  items: [
    { employee_id: "employee-1", username: "Анна Смирнова", open_tickets: 9, closed_tickets: 16 },
    { employee_id: "employee-2", username: "Игорь Петров", open_tickets: 12, closed_tickets: 11 },
    { employee_id: "employee-3", username: "Мария Козлова", open_tickets: 5, closed_tickets: 14 },
    { employee_id: "employee-4", username: "Дмитрий Орлов", open_tickets: 11, closed_tickets: 8 },
    { employee_id: "employee-5", username: "Елена Волкова", open_tickets: 6, closed_tickets: 8 },
  ],
}

export const MOCK_ADMIN_SLA_DTO: AdminSlaDto = {
  by_priority: [
    {
      priority: "low",
      avg_ttfr: 45,
      avg_ttr: 960,
      sla_ttfr_compliance_pct: 94.5,
      sla_ttr_compliance_pct: 91.2,
    },
    {
      priority: "medium",
      avg_ttfr: 28,
      avg_ttr: 540,
      sla_ttfr_compliance_pct: 86.1,
      sla_ttr_compliance_pct: 78.4,
    },
    {
      priority: "high",
      avg_ttfr: 12,
      avg_ttr: 240,
      sla_ttfr_compliance_pct: 72.3,
      sla_ttr_compliance_pct: 61.8,
    },
  ],
  top_violated_categories: [
    { category: "технический сбой", count: 7 },
    { category: "проблема с доступом", count: 5 },
    { category: "жалоба на сервис", count: 3 },
    { category: "вопрос по оплате", count: 2 },
    { category: "консультация", count: 1 },
  ],
}

export const MOCK_USER_DEMOGRAPHICS_DTO: UserDemographicsDto = {
  by_gender: [
    { key: "male", count: 312 },
    { key: "female", count: 278 },
  ],
  by_age_group: [
    { key: "18-24", count: 96 },
    { key: "25-34", count: 214 },
    { key: "35-44", count: 158 },
    { key: "45-54", count: 82 },
    { key: "55+", count: 40 },
  ],
  by_city: [
    { key: "Москва", count: 186 },
    { key: "Санкт-Петербург", count: 112 },
    { key: "Новосибирск", count: 54 },
    { key: "Екатеринбург", count: 48 },
    { key: "Казань", count: 41 },
    { key: "Нижний Новгород", count: 33 },
    { key: "Краснодар", count: 29 },
    { key: "Самара", count: 24 },
    { key: "Ростов-на-Дону", count: 22 },
    { key: "Воронеж", count: 18 },
    { key: "Пермь", count: 13 },
    { key: "Томск", count: 10 },
  ],
}

export const MOCK_USER_RETENTION_DTO: UserRetentionDto = {
  retention_7d_pct: 64.2,
  retention_14d_pct: 38.5,
  retention_30d_pct: 8.7,
}

export const MOCK_REVIEWS_DYNAMICS_DTO: ReviewDynamicsDto = {
  items: REVIEWS_POSITIVE_COUNTS.map((positive, i) => ({
    date: toDate(SERIES_START, i),
    positive_count: positive,
    negative_count: REVIEWS_NEGATIVE_COUNTS[i],
  })),
}

export const MOCK_TICKET_ANOMALIES_DTO: TicketAnomaliesDto = {
  items: [
    {
      category: "технический сбой",
      product: "мобильное приложение",
      count_48h: 14,
      rolling_avg: 4.2,
      stddev: 2.9,
      z_score: 3.38,
    },
    {
      category: "вопрос по оплате",
      product: "платёжный сервис",
      count_48h: 9,
      rolling_avg: 3.1,
      stddev: 2.4,
      z_score: 2.46,
    },
    {
      category: "проблема с доступом",
      product: "личный кабинет",
      count_48h: 6,
      rolling_avg: 2.8,
      stddev: 1.9,
      z_score: 1.68,
    },
    {
      category: "консультация",
      product: "веб-сервис",
      count_48h: 1,
      rolling_avg: 3.6,
      stddev: 1.4,
      z_score: -1.86,
    },
  ],
}

export const MOCK_TICKET_FORECAST_DTO: TicketForecastDto = {
  forecast: [
    { predicted_count: 4.1, lower_bound: 2.3, upper_bound: 5.9 },
    { predicted_count: 3.6, lower_bound: 1.8, upper_bound: 5.4 },
    { predicted_count: 3.2, lower_bound: 1.2, upper_bound: 5.2 },
    { predicted_count: 4.5, lower_bound: 2.2, upper_bound: 6.8 },
    { predicted_count: 5.0, lower_bound: 2.5, upper_bound: 7.5 },
    { predicted_count: 4.3, lower_bound: 1.6, upper_bound: 7.0 },
    { predicted_count: 3.4, lower_bound: 0.6, upper_bound: 6.2 },
  ].map((item, i) => ({ date: toDate(FORECAST_START, i), ...item })),
}

const heatmapCount = (day: number, hour: number) => {
  const isWeekend = day >= 5
  const isWorkHours = hour >= 9 && hour <= 18
  const isEvening = hour >= 19 && hour <= 22
  if (isWorkHours) return isWeekend ? 2 + (hour % 3) : 5 + ((day + hour) % 5)
  if (isEvening) return isWeekend ? 2 : 3 + (hour % 2)
  return (day + hour) % 4 === 0 ? 1 : 0
}

export const MOCK_DASHBOARD6_TICKETS_DTO: Dashboard6TicketsDto = {
  top_keywords: [
    { word: "ошибка", count: 38 },
    { word: "оплата", count: 27 },
    { word: "вход", count: 24 },
    { word: "приложение", count: 21 },
    { word: "пароль", count: 17 },
    { word: "не работает", count: 15 },
    { word: "возврат", count: 11 },
    { word: "уведомления", count: 8 },
  ],
  top_categories: MOCK_TICKET_SUMMARY_DTO.by_category.map(({ key, count }) => ({ category: key, count })),
  dynamics: MOCK_TICKET_TIMELINE_DTO.items,
  anomalies: MOCK_TICKET_ANOMALIES_DTO.items.map(({ stddev: _stddev, ...rest }) => rest),
  by_city: [
    { city: "Москва", count: 34 },
    { city: "Санкт-Петербург", count: 21 },
    { city: "Новосибирск", count: 11 },
    { city: "Екатеринбург", count: 9 },
    { city: "Казань", count: 8 },
    { city: null, count: 17 },
  ],
  by_age_group: [
    { group: "18-24", count: 14 },
    { group: "25-34", count: 36 },
    { group: "35-44", count: 27 },
    { group: "45-54", count: 13 },
    { group: "55+", count: 6 },
    { group: null, count: 4 },
  ],
  heatmap: Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => ({ day_of_week: day, hour, count: heatmapCount(day, hour) })),
  ).flat(),
  slowest_categories: [
    { category: "жалоба на сервис", avg_ttr_min: 1240 },
    { category: "технический сбой", avg_ttr_min: 870 },
    { category: "проблема с доступом", avg_ttr_min: 520 },
    { category: "вопрос по оплате", avg_ttr_min: 410 },
    { category: "консультация", avg_ttr_min: 95 },
  ],
}
