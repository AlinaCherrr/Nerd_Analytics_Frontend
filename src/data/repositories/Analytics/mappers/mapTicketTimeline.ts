import type { TicketTimelineDto } from "data/sources/Analytics"
import type { TicketTimeline } from "../types"

export const mapTicketTimeline = (dto: TicketTimelineDto): TicketTimeline => ({ items: dto.items })
