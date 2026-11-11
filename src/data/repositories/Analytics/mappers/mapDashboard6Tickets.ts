import type { Dashboard6TicketsDto } from "data/sources/Analytics"
import type { Dashboard6Tickets } from "../types"
import { mapCategoryCount } from "./mapCategoryCount"

export const mapDashboard6Tickets = (dto: Dashboard6TicketsDto): Dashboard6Tickets => ({
  topKeywords: dto.top_keywords.map((w) => ({ word: w.word, count: w.count })),
  topCategories: dto.top_categories.map(mapCategoryCount),
  dynamics: dto.dynamics,
  anomalies: dto.anomalies.map((a) => ({
    category: a.category,
    product: a.product,
    count48h: a.count_48h,
    rollingAvg: a.rolling_avg,
    zScore: a.z_score,
  })),
  slowestCategories: dto.slowest_categories.map((s) => ({
    category: s.category,
    avgTtrMin: s.avg_ttr_min,
  })),
})
