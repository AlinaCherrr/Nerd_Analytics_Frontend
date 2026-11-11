import { IS_MOCK } from "shared/utils"
import { ticketsMockRepository } from "./mockRepository"
import { ticketsRealRepository } from "./realRepository"
import type { TicketsRepository } from "./types"

export const ticketsRepository: TicketsRepository = IS_MOCK ? ticketsMockRepository : ticketsRealRepository

export type {
  Ticket,
  TicketAction,
  TicketPriority,
  TicketProduct,
  CreateTicketInput,
  UpdateTicketInput,
  StatusHistoryEntry,
  GuestTicketInput,
  GuestTicketResult,
  GuestTrackResult,
  TicketsRepository,
} from "./types"
