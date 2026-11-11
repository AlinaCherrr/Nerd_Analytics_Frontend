import type { TicketStatus } from "data/repositories/TicketStatuses"

export type TicketAction = "close" | "reopen"
export type TicketPriority = "low" | "medium" | "high"
export type TicketProduct =
  | "веб-сервис"
  | "платёжный сервис"
  | "мобильное приложение"
  | "API интеграция"
  | "личный кабинет"
  | "аналитический модуль"

export interface Ticket {
  id: string
  clientId: string
  responsibleId: string | null
  title: string | null
  product: TicketProduct | null
  status: TicketStatus
  priority: TicketPriority
  date: string
  deadline: string
  closedAt: string | null
  reopenedCount: number
  aiSuggestedCategory: string | null
  finalCategory: string | null
  isAdminChanged: boolean
  keywords: string[]
  confidence: number | null
  slaTtfrMin: number | null
  slaTtrMin: number | null
  action: TicketAction | null
  actionLabel: string | null
}

export interface CreateTicketInput {
  product: TicketProduct
  priority?: TicketPriority
  deadline: string
  slaTtfrMin?: number
  slaTtrMin?: number
}

export interface UpdateTicketInput {
  status?: TicketStatus
  priority?: TicketPriority
  responsibleId?: string
  finalCategory?: string
  isAdminChanged?: boolean
  slaTtfrMin?: number
}

export interface GuestTicketInput {
  product: TicketProduct
  priority: TicketPriority
  message: string
  guestEmail: string
}

export interface GuestTicketResult {
  ticketId: string
  guestToken: string
  status: TicketStatus
}

export interface GuestTrackResult {
  ticketId: string
  status: TicketStatus
  statusUpdatedAt: string | null
  product: string
  createdAt: string
}

export interface StatusHistoryEntry {
  id: string
  ticketId: string | null
  statusFrom: TicketStatus | null
  statusTo: TicketStatus | null
  changedBy: string | null
  createdAt: string
}

export interface TicketsRepository {
  createGuestTicket: (input: GuestTicketInput) => Promise<GuestTicketResult>
  trackGuestTicket: (token: string) => Promise<GuestTrackResult>
  getTickets: (params?: { status?: string; priority?: string; product?: string }) => Promise<Ticket[]>
  getTicket: (id: string) => Promise<Ticket>
  createTicket: (input: CreateTicketInput) => Promise<Ticket>
  updateTicket: (id: string, input: UpdateTicketInput) => Promise<Ticket>
  reopenTicket: (id: string) => Promise<Ticket>
  addComment: (id: string, message: string) => Promise<void>
  patchStatus: (id: string, status: TicketStatus, responsibleId?: string) => Promise<Ticket>
  patchPriority: (id: string, adminPriority: string) => Promise<Ticket>
  getStatusHistory: (id: string) => Promise<StatusHistoryEntry[]>
}
