import { ticketsMockSource } from "data/sources/Tickets/mock/mockSource"
import { mapStatusHistory, mapTicket } from "./mappers"
import type { TicketsRepository } from "./types"

export const ticketsMockRepository: TicketsRepository = {
  createGuestTicket: async (input) => {
    const dto = await ticketsMockSource.createGuestTicket({
      product: input.product,
      priority: input.priority,
      message: input.message,
      guest_email: input.guestEmail,
    })
    return { ticketId: String(dto.ticket_id), guestToken: dto.guest_token, status: dto.status }
  },

  trackGuestTicket: async (token) => {
    const dto = await ticketsMockSource.trackGuestTicket(token)
    return {
      ticketId: String(dto.ticket_id),
      status: dto.status,
      statusUpdatedAt: dto.status_updated_at,
      product: dto.product,
      createdAt: dto.created_at,
    }
  },

  getTickets: async (params) => {
    const dtos = await ticketsMockSource.getTickets(params)
    return dtos.map(mapTicket)
  },

  getTicket: async (id) => {
    const dto = await ticketsMockSource.getTicket(id)
    return mapTicket(dto)
  },

  createTicket: async (input) => {
    const dto = await ticketsMockSource.createTicket({
      product: input.product,
      priority: input.priority,
      deadline: input.deadline,
      sla_ttfr_min: input.slaTtfrMin,
      sla_ttr_min: input.slaTtrMin,
    })
    return mapTicket(dto)
  },

  updateTicket: async (id, input) => {
    const dto = await ticketsMockSource.updateTicket(id, {
      status: input.status,
      priority: input.priority,
      responsible_id: input.responsibleId,
      final_category: input.finalCategory,
      is_admin_changed: input.isAdminChanged,
      sla_ttfr_min: input.slaTtfrMin,
    })
    return mapTicket(dto)
  },

  reopenTicket: async (id) => {
    const dto = await ticketsMockSource.reopenTicket(id)
    return mapTicket(dto)
  },

  addComment: async (id, message) => {
    await ticketsMockSource.addComment(id, { message })
  },

  patchStatus: async (id, status, responsibleId) => {
    const dto = await ticketsMockSource.patchStatus(id, {
      status,
      responsible_id: responsibleId,
    })
    return mapTicket(dto)
  },

  patchPriority: async (id, adminPriority) => {
    const dto = await ticketsMockSource.patchPriority(id, { admin_priority: adminPriority })
    return mapTicket(dto)
  },

  getStatusHistory: async (id) => {
    const dtos = await ticketsMockSource.getStatusHistory(id)
    return dtos.map(mapStatusHistory)
  },
}
