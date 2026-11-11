import { useQuery } from "@tanstack/react-query"
import { ticketStatusesRepository } from "data/repositories/TicketStatuses"
import { TICKET_STATUSES_QUERY_KEY, TICKET_STATUSES_STALE_TIME } from "../constants"

export const useTicketStatuses = () => {
  const { data: statuses = [], isLoading } = useQuery({
    queryKey: TICKET_STATUSES_QUERY_KEY,
    queryFn: ticketStatusesRepository.getStatuses,
    staleTime: TICKET_STATUSES_STALE_TIME,
  })

  const getLabel = (value: string) => {
    if (isLoading) return "—"
    return statuses.find((s) => s.value === value)?.label ?? value
  }

  return { statuses, getLabel, isLoading }
}
