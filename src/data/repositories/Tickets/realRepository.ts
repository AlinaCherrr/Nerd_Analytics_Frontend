import { ticketsSource } from "data/sources/Tickets"
import { mapStatusHistory, mapTicket } from "./mappers"
import type { TicketsRepository } from "./types"

export const ticketsRealRepository: TicketsRepository = {
  createGuestTicket: async (input) => {
    const dto = await ticketsSource.createGuestTicket({
      product: input.product,
      priority: input.priority,
      message: input.message,
      guest_email: input.guestEmail,
    })
    return { ticketId: String(dto.ticket_id), guestToken: dto.guest_token, status: dto.status }
  },

  trackGuestTicket: async (token) => {
    const dto = await ticketsSource.trackGuestTicket(token)
    return {
      ticketId: String(dto.ticket_id),
      status: dto.status,
      statusUpdatedAt: dto.status_updated_at,
      product: dto.product,
      createdAt: dto.created_at,
    }
  },

  getTickets: async (params) => {
    const dtos = await ticketsSource.getTickets(params)
    return dtos.map(mapTicket)
  },

  getTicket: async (id) => {
    const dto = await ticketsSource.getTicket(id)
    return mapTicket(dto)
  },

  createTicket: async (input) => {
    const dto = await ticketsSource.createTicket({
      product: input.product,
      priority: input.priority,
      deadline: input.deadline,
      sla_ttfr_min: input.slaTtfrMin,
      sla_ttr_min: input.slaTtrMin,
    })
    return mapTicket(dto)
  },

  updateTicket: async (id, input) => {
    const dto = await ticketsSource.updateTicket(id, {
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
    const dto = await ticketsSource.reopenTicket(id)
    return mapTicket(dto)
  },

  addComment: async (id, message) => {
    await ticketsSource.addComment(id, { message })
  },

  patchStatus: async (id, status, responsibleId) => {
    const dto = await ticketsSource.patchStatus(id, { status, responsible_id: responsibleId })
    return mapTicket(dto)
  },

  patchPriority: async (id, adminPriority) => {
    const dto = await ticketsSource.patchPriority(id, { admin_priority: adminPriority })
    return mapTicket(dto)
  },

  getStatusHistory: async (id) => {
    const dtos = await ticketsSource.getStatusHistory(id)
    return dtos.map(mapStatusHistory)
  },
}
