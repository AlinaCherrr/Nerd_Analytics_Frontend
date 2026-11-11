import { ticketStatusesMockSource } from "data/sources/TicketStatuses/mock/mockSource"
import { mapTicketStatus } from "./mappers"
import type { TicketStatusesRepository } from "./types"

export const ticketStatusesMockRepository: TicketStatusesRepository = {
  getStatuses: async () => {
    const dtos = await ticketStatusesMockSource.getStatuses()
    return dtos.map(mapTicketStatus)
  },
}
