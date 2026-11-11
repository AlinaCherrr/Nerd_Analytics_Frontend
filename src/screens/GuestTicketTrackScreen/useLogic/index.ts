import { useParams } from "react-router-dom"
import { useGuestTicketTrack } from "domain/Tickets"
import { useTicketStatuses } from "domain/TicketStatuses"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })

export const useGuestTicketTrackScreen = () => {
  const { token } = useParams<{ token: string }>()
  const { data: ticket, isLoading, isError } = useGuestTicketTrack(token)
  const { getLabel } = useTicketStatuses()

  return { ticket, isLoading, isError, getLabel, formatDate }
}
