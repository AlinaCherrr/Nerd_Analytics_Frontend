import type { AdminWorkloadDto } from "data/sources/Analytics"
import type { AdminWorkload } from "../types"

export const mapAdminWorkload = (dto: AdminWorkloadDto): AdminWorkload => ({
  items: dto.items.map((i) => ({
    employeeId: i.employee_id,
    username: i.username,
    openTickets: i.open_tickets,
    closedTickets: i.closed_tickets,
  })),
})
