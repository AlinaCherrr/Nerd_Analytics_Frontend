import type { ReactNode } from "react"
import type { TicketStatus } from "data/repositories/TicketStatuses"

export type TabValue = "all" | TicketStatus

export type TabItem = { value: TabValue; icon: ReactNode }
