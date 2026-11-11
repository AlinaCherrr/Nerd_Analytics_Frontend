import { ApiError } from "shared/http"
import { delay } from "shared/utils/delay"
import type {
  AddCommentRequest,
  CommentDto,
  CreateTicketRequest,
  GuestTicketCreateRequest,
  GuestTicketResponse,
  GuestTrackResponse,
  PatchPriorityRequest,
  PatchStatusRequest,
  StatusHistoryDto,
  TicketDto,
  UpdateTicketRequest,
} from "../types"
import { MOCK_TICKET_DTOS } from "./fixtures"

const store: TicketDto[] = [...MOCK_TICKET_DTOS]

const findOrThrow = (id: string): TicketDto => {
  const ticket = store.find((t) => t.id === id)
  if (!ticket) throw new ApiError(`Обращение ${id} не найдено`, 404)
  return ticket
}

export const ticketsMockSource = {
  createGuestTicket: async (_req: GuestTicketCreateRequest): Promise<GuestTicketResponse> => {
    await delay(300)
    return { ticket_id: `guest-ticket-${Date.now()}`, guest_token: `mock-token-${Date.now()}`, status: "in_progress" }
  },

  trackGuestTicket: async (_token: string): Promise<GuestTrackResponse> => {
    await delay(200)
    return {
      ticket_id: "mock-ticket-id",
      status: "in_progress",
      status_updated_at: null,
      product: "веб-сервис",
      created_at: new Date().toISOString(),
    }
  },

  getTickets: async (_params?: { status?: string; priority?: string; product?: string }): Promise<TicketDto[]> => {
    await delay(300)
    return [...store]
  },

  getTicket: async (id: string): Promise<TicketDto> => {
    await delay(200)
    return { ...findOrThrow(id) }
  },

  createTicket: async (req: CreateTicketRequest): Promise<TicketDto> => {
    await delay(300)
    const ticket: TicketDto = {
      id: `ticket-${Date.now()}`,
      client_id: "mock-user-id",
      responsible_id: null,
      title: null,
      product: req.product,
      status: "in_progress",
      priority: req.priority ?? "medium",
      date: new Date().toISOString(),
      deadline: req.deadline,
      closed_at: null,
      reopened_count: 0,
      last_reopened_at: null,
      ai_suggested_category: null,
      final_category: null,
      is_admin_changed: false,
      keywords: [],
      confidence: null,
      sla_ttfr_min: req.sla_ttfr_min ?? null,
      sla_ttr_min: req.sla_ttr_min ?? null,
      action: "close",
      action_label: "Закрыть",
    }
    store.push(ticket)
    return ticket
  },

  updateTicket: async (id: string, req: UpdateTicketRequest): Promise<TicketDto> => {
    await delay(200)
    const idx = store.findIndex((t) => t.id === id)
    if (idx === -1) throw new ApiError(`Обращение ${id} не найдено`, 404)
    store[idx] = {
      ...store[idx],
      ...(req.status && { status: req.status }),
      ...(req.priority && { priority: req.priority }),
      ...(req.responsible_id !== undefined && { responsible_id: req.responsible_id }),
      ...(req.final_category !== undefined && { final_category: req.final_category }),
      ...(req.is_admin_changed !== undefined && { is_admin_changed: req.is_admin_changed }),
    }
    return { ...store[idx] }
  },

  reopenTicket: async (id: string): Promise<TicketDto> => {
    await delay(200)
    const idx = store.findIndex((t) => t.id === id)
    if (idx === -1) throw new ApiError(`Обращение ${id} не найдено`, 404)
    store[idx] = {
      ...store[idx],
      status: "reopened",
      reopened_count: store[idx].reopened_count + 1,
    }
    return { ...store[idx] }
  },

  addComment: async (id: string, req: AddCommentRequest): Promise<CommentDto> => {
    await delay(200)
    return {
      id: `comment-${Date.now()}`,
      chat_id: `chat-${id}`,
      ticket_id: id,
      client_id: "mock-user-id",
      role: "client",
      message: req.message,
      resolved_by_ai: false,
      created_at: new Date().toISOString(),
    }
  },

  patchStatus: async (id: string, req: PatchStatusRequest): Promise<TicketDto> => {
    await delay(200)
    const idx = store.findIndex((t) => t.id === id)
    if (idx === -1) throw new ApiError(`Обращение ${id} не найдено`, 404)
    store[idx] = {
      ...store[idx],
      status: req.status,
      ...(req.responsible_id !== undefined && { responsible_id: req.responsible_id }),
    }
    return { ...store[idx] }
  },

  patchPriority: async (id: string, req: PatchPriorityRequest): Promise<TicketDto> => {
    await delay(200)
    const idx = store.findIndex((t) => t.id === id)
    if (idx === -1) throw new ApiError(`Обращение ${id} не найдено`, 404)
    store[idx] = { ...store[idx], priority: req.admin_priority as TicketDto["priority"] }
    return { ...store[idx] }
  },

  getStatusHistory: async (_id: string): Promise<StatusHistoryDto[]> => {
    await delay(200)
    return []
  },
}
