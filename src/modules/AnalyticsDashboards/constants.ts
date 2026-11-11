import type { FC } from "react"
import {
  BarChart2, Brain, Shield, Users, Star, FileSearch,
} from "lucide-react"
import { AnalyticsOverviewDashboard } from "modules/AnalyticsOverviewDashboard"
import { AnalyticsAiDashboard } from "modules/AnalyticsAiDashboard"
import { AnalyticsAdminsDashboard } from "modules/AnalyticsAdminsDashboard"
import { AnalyticsUsersDashboard } from "modules/AnalyticsUsersDashboard"
import { AnalyticsReviewsDashboard } from "modules/AnalyticsReviewsDashboard"
import { AnalyticsTicketsDetailDashboard } from "modules/AnalyticsTicketsDetailDashboard"
import type { AnalyticsDashboardId, AnalyticsDashboardTab } from "./types"

export const DEFAULT_ANALYTICS_DASHBOARD_ID: AnalyticsDashboardId = "overview"

export const ANALYTICS_DASHBOARD_TABS: AnalyticsDashboardTab[] = [
  { id: "overview", label: "Сводная", icon: BarChart2 },
  { id: "ai", label: "ИИ", icon: Brain },
  { id: "admins", label: "Администраторы", icon: Shield },
  { id: "users", label: "Пользователи", icon: Users },
  { id: "reviews", label: "Отзывы", icon: Star },
  { id: "tickets", label: "Тикеты (детально)", icon: FileSearch },
]

export const ANALYTICS_DASHBOARD_COMPONENTS: Record<AnalyticsDashboardId, FC> = {
  overview: AnalyticsOverviewDashboard,
  ai: AnalyticsAiDashboard,
  admins: AnalyticsAdminsDashboard,
  users: AnalyticsUsersDashboard,
  reviews: AnalyticsReviewsDashboard,
  tickets: AnalyticsTicketsDetailDashboard,
}
