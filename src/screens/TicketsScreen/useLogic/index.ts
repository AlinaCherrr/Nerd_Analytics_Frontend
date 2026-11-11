import { useState } from "react"
import { generatePath, useNavigate } from "react-router-dom"
import { useTickets } from "domain/Tickets"
import { useTicketStatuses } from "domain/TicketStatuses"
import { useMe } from "domain/Auth/useMe"
import { routes } from "shared/utils/routes"
import type { TabValue } from "../types"

export const useTicketsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const [search, setSearch] = useState("")
  const [filterProduct, setFilterProduct] = useState("")
  const [filterPriority, setFilterPriority] = useState("")

  const navigate = useNavigate()
  const { data: user } = useMe()
  const isAdmin = user?.role === "employee"

  const { data: tickets = [], isLoading, isError, refetch } = useTickets()
  const { getLabel } = useTicketStatuses()

  const openTicket = (ticketId: string) =>
    void navigate(generatePath(routes.ticketStatus, { ticketId }))

  const filtered = tickets.filter((t) => {
    if (activeTab !== "all" && t.status !== activeTab) return false
    if (filterProduct && t.product !== filterProduct) return false
    if (filterPriority && t.priority !== filterPriority) return false
    if (search) {
      const q = search.toLowerCase()
      const haystack = [
        t.product,
        t.finalCategory,
        t.aiSuggestedCategory,
        ...(t.keywords ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const countByTab = (tab: TabValue) =>
    tab === "all" ? tickets.length : tickets.filter((t) => t.status === tab).length

  const hasFilters = search || filterProduct || filterPriority

  const handleResetFilters = () => {
    setSearch("")
    setFilterProduct("")
    setFilterPriority("")
  }

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    filterProduct,
    setFilterProduct,
    filterPriority,
    setFilterPriority,
    isAdmin,
    isLoading,
    isError,
    retry: () => void refetch(),
    getLabel,
    openTicket,
    filtered,
    countByTab,
    hasFilters,
    handleResetFilters,
  }
}
