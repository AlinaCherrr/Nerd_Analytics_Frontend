import { useQuery } from "@tanstack/react-query"
import { ticketsRepository } from "data/repositories/Tickets"
import type { Ticket } from "data/repositories/Tickets"
import { TICKETS_QUERY_KEY, TICKETS_STALE_TIME } from "../constants"

export const useTickets = () => {
  return useQuery({
    queryKey: TICKETS_QUERY_KEY,
    queryFn: (): Promise<Ticket[]> => ticketsRepository.getTickets(),
    staleTime: TICKETS_STALE_TIME,
  })
}
