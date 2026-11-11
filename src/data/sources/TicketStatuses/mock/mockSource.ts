import { delay } from "shared/utils/delay"
import type { TicketStatusOptionDto } from "../types"
import { MOCK_TICKET_STATUS_DTOS } from "./fixtures"

export const ticketStatusesMockSource = {
  getStatuses: async (): Promise<TicketStatusOptionDto[]> => {
    await delay(200)
    return [...MOCK_TICKET_STATUS_DTOS]
  },
}
