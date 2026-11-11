import { useQueryClient } from "@tanstack/react-query"
import type { Ticket } from "data/repositories/Tickets"
import { TICKET_STATUS } from "data/repositories/TicketStatuses"
import { TICKETS_QUERY_KEY } from "../constants"

const applyAction = (ticket: Ticket): Ticket => {
  if (ticket.action === "close") {
    return {
      ...ticket,
      status: TICKET_STATUS.closed,
      closedAt: new Date().toISOString(),
      action: "reopen",
      actionLabel: "Переоткрыть",
    }
  }
  if (ticket.action === "reopen") {
    return {
      ...ticket,
      status: TICKET_STATUS.reopened,
      closedAt: null,
      reopenedCount: ticket.reopenedCount + 1,
      action: "close",
      actionLabel: "Закрыть",
    }
  }
  return ticket
}

export const useTicketAction = () => {
  const queryClient = useQueryClient()
  return (ticketId: string) => {
    queryClient.setQueryData<Ticket[]>(TICKETS_QUERY_KEY, (old) =>
      old?.map((t) => (t.id === ticketId ? applyAction(t) : t)),
    )
  }
}
