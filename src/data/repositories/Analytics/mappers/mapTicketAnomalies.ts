import type { TicketAnomaliesDto } from "data/sources/Analytics"
import type { TicketAnomalies } from "../types"

export const mapTicketAnomalies = (dto: TicketAnomaliesDto): TicketAnomalies => ({
  items: dto.items.map((i) => ({
    category: i.category,
    product: i.product,
    count48h: i.count_48h,
    rollingAvg: i.rolling_avg,
    stddev: i.stddev,
    zScore: i.z_score,
  })),
})
