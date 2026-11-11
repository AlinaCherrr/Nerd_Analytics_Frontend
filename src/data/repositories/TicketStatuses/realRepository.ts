import { ticketStatusesSource } from "data/sources/TicketStatuses"
import { mapTicketStatus } from "./mappers"
import type { TicketStatusesRepository } from "./types"

export const ticketStatusesRealRepository: TicketStatusesRepository = {
  getStatuses: async () => {
    const dtos = await ticketStatusesSource.getStatuses()
    return dtos.map(mapTicketStatus)
  },
}
