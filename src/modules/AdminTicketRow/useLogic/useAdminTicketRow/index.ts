import { useTicketStatuses } from "domain/TicketStatuses"
import type { AdminTicketRowProps } from "../../types"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })

export const useAdminTicketRow = ({ ticket }: Pick<AdminTicketRowProps, "ticket">) => {
  const { getLabel } = useTicketStatuses()
  const category = ticket.finalCategory ?? ticket.aiSuggestedCategory

  return { getLabel, category, formatDate }
}
