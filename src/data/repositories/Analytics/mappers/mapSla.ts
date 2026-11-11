import type { SlaDto } from "data/sources/Analytics"
import type { Sla } from "../types"

export const mapSla = (dto: SlaDto): Sla => ({
  total: dto.total,
  breached: dto.breached,
  compliant: dto.compliant,
  complianceRate: dto.compliance_rate,
})
