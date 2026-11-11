import type { TicketSummaryDto } from "data/sources/Analytics"
import type { TicketSummary } from "../types"
import { mapKeyCount } from "./mapKeyCount"

export const mapTicketSummary = (dto: TicketSummaryDto): TicketSummary => ({
  byStatus: dto.by_status.map(mapKeyCount),
  byProduct: dto.by_product.map(mapKeyCount),
  byCategory: dto.by_category.map(mapKeyCount),
})
