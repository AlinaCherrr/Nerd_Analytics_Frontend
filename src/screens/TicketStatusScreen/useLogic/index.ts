import { useState } from "react"
import { useParams } from "react-router-dom"
import { useTickets } from "domain/Tickets"
import { useTicketStatuses } from "domain/TicketStatuses"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })

export const useTicketStatusScreen = () => {
  const { ticketId } = useParams<{ ticketId: string }>()
  const { data: tickets = [], isLoading, isError, refetch } = useTickets()
  const { getLabel } = useTicketStatuses()
  const [isRating, setIsRating] = useState(false)

  const ticket = tickets.find((t) => t.id === ticketId)
  const category = ticket && (ticket.finalCategory ?? ticket.aiSuggestedCategory)

  const openRating = () => setIsRating(true)
  const closeRating = () => setIsRating(false)

  return {
    ticket,
    category,
    isLoading,
    isError,
    retry: () => void refetch(),
    getLabel,
    isRating,
    openRating,
    closeRating,
    formatDate,
  }
}
