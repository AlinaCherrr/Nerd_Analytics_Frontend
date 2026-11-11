import type { LucideIcon } from "lucide-react"

export type AnalyticsDashboardId = "overview" | "ai" | "admins" | "users" | "reviews" | "tickets"

export interface AnalyticsDashboardTab {
  id: AnalyticsDashboardId
  label: string
  icon: LucideIcon
}
