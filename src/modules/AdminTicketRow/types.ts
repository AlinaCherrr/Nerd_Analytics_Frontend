import type { Ticket } from "data/repositories/Tickets"

export interface AdminTicketRowProps {
  ticket: Ticket
  onClick: () => void
}
