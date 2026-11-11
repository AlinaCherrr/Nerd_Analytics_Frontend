import { IS_MOCK } from "shared/utils"
import { ticketStatusesMockRepository } from "./mockRepository"
import { ticketStatusesRealRepository } from "./realRepository"
import type { TicketStatusesRepository } from "./types"

export const ticketStatusesRepository: TicketStatusesRepository = IS_MOCK
  ? ticketStatusesMockRepository
  : ticketStatusesRealRepository

export { TICKET_STATUS } from "./types"
export type { TicketStatus, TicketStatusOption, TicketStatusesRepository } from "./types"
