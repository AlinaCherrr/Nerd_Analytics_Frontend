import type { TicketForecastDto } from "data/sources/Analytics"
import type { TicketForecast } from "../types"

export const mapTicketForecast = (dto: TicketForecastDto): TicketForecast => ({
  forecast: dto.forecast.map((f) => ({
    date: f.date,
    predictedCount: f.predicted_count,
    lowerBound: f.lower_bound,
    upperBound: f.upper_bound,
  })),
})
