import type { SendMessageResult } from "data/repositories/Assistant"

export type TicketInfo = Pick<SendMessageResult, "ticketStatus" | "ticketTitle" | "solutionOffered">

export type AssistantLocationState = { initialMessage?: string } | null
