import type { AiEfficiencyDto } from "data/sources/Analytics"
import type { AiEfficiency } from "../types"
import { mapCategoryCount } from "./mapCategoryCount"

export const mapAiEfficiency = (dto: AiEfficiencyDto): AiEfficiency => ({
  autoResolved: dto.auto_resolved,
  escalated: dto.escalated,
  autoResolvedPct: dto.auto_resolved_pct,
  avgMessagesBeforeEscalation: dto.avg_messages_before_escalation,
  topEscalatedCategories: dto.top_escalated_categories.map(mapCategoryCount),
  topResolvedCategories: dto.top_resolved_categories.map(mapCategoryCount),
})
