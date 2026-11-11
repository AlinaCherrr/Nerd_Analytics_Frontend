import type { AdminSlaDto } from "data/sources/Analytics"
import type { AdminSla } from "../types"
import { mapCategoryCount } from "./mapCategoryCount"

export const mapAdminSla = (dto: AdminSlaDto): AdminSla => ({
  byPriority: dto.by_priority.map((p) => ({
    priority: p.priority,
    avgTtfr: p.avg_ttfr,
    avgTtr: p.avg_ttr,
    slaTtfrCompliancePct: p.sla_ttfr_compliance_pct,
    slaTtrCompliancePct: p.sla_ttr_compliance_pct,
  })),
  topViolatedCategories: dto.top_violated_categories.map(mapCategoryCount),
})
