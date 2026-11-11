import { useQuery } from "@tanstack/react-query"
import { ticketsRepository } from "data/repositories/Tickets"
import { GUEST_TICKET_TRACK_QUERY_KEY } from "../constants"

export const useGuestTicketTrack = (token: string | undefined) =>
  useQuery({
    queryKey: [...GUEST_TICKET_TRACK_QUERY_KEY, token],
    queryFn: () => ticketsRepository.trackGuestTicket(token!),
    enabled: Boolean(token),
    retry: false,
  })
