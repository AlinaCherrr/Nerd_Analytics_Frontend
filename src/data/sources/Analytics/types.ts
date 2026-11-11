export interface AnalyticsParams {
  date_from?: string
  date_to?: string
  product?: string
  priority?: string
  category?: string
}

export interface KeyCountDto {
  key: string
  count: number
}

export interface TicketSummaryDto {
  by_status: KeyCountDto[]
  by_product: KeyCountDto[]
  by_category: KeyCountDto[]
}

export interface SlaDto {
  total: number
  breached: number
  compliant: number
  compliance_rate: number
}

export interface AiAccuracyDto {
  total_classified: number
  admin_changed: number
  accuracy_rate: number
}

export interface ReviewsSummaryDto {
  average_rating: number
  total_reviews: number
  sentiment_distribution: KeyCountDto[]
}

export interface ReviewsKeywordsDto {
  keywords_positive: KeyCountDto[]
  keywords_negative: KeyCountDto[]
}

export interface TicketTimelineDto {
  items: Array<{ date: string; count: number }>
}

export interface CategoryCountExtDto {
  category: string
  count: number
}

export interface AiEfficiencyDto {
  auto_resolved: number
  escalated: number
  auto_resolved_pct: number
  avg_messages_before_escalation: number
  top_escalated_categories: CategoryCountExtDto[]
  top_resolved_categories: CategoryCountExtDto[]
}

export interface AdminWorkloadItemDto {
  employee_id: string
  username: string
  open_tickets: number
  closed_tickets: number
}

export interface AdminWorkloadDto {
  items: AdminWorkloadItemDto[]
}

export interface SlaPriorityItemDto {
  priority: string
  avg_ttfr: number
  avg_ttr: number
  sla_ttfr_compliance_pct: number
  sla_ttr_compliance_pct: number
}

export interface AdminSlaDto {
  by_priority: SlaPriorityItemDto[]
  top_violated_categories: CategoryCountExtDto[]
}

export interface DemographicsCountItemDto {
  key: string
  count: number
}

export interface UserDemographicsDto {
  by_gender: DemographicsCountItemDto[]
  by_age_group: DemographicsCountItemDto[]
  by_city: DemographicsCountItemDto[]
}

export interface UserRetentionDto {
  retention_7d_pct: number
  retention_14d_pct: number
  retention_30d_pct: number
}

export interface ReviewDynamicsItemDto {
  date: string
  positive_count: number
  negative_count: number
}

export interface ReviewDynamicsDto {
  items: ReviewDynamicsItemDto[]
}

export interface TicketAnomalyItemDto {
  category: string
  product: string
  count_48h: number
  rolling_avg: number
  stddev: number
  z_score: number
}

export interface TicketAnomaliesDto {
  items: TicketAnomalyItemDto[]
}

export interface ForecastItemDto {
  date: string
  predicted_count: number
  lower_bound: number
  upper_bound: number
}

export interface TicketForecastDto {
  forecast: ForecastItemDto[]
}

export interface WordCountDto {
  word: string
  count: number
}

export interface SlowestCategoryDto {
  category: string
  avg_ttr_min: number
}

export interface DashboardAnomalyItemDto {
  category: string
  product: string
  count_48h: number
  rolling_avg: number
  z_score: number
}

export interface Dashboard6TicketsDto {
  top_keywords: WordCountDto[]
  top_categories: CategoryCountExtDto[]
  dynamics: Array<{ date: string; count: number }>
  anomalies: DashboardAnomalyItemDto[]
  by_city: Array<{ city?: string | null; count: number }>
  by_age_group: Array<{ group?: string | null; count: number }>
  heatmap: Array<{ day_of_week: number; hour: number; count: number }>
  slowest_categories: SlowestCategoryDto[]
}
