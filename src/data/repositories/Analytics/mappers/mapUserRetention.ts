import type { UserRetentionDto } from "data/sources/Analytics"
import type { UserRetention } from "../types"

export const mapUserRetention = (dto: UserRetentionDto): UserRetention => ({
  retention7dPct: dto.retention_7d_pct,
  retention14dPct: dto.retention_14d_pct,
  retention30dPct: dto.retention_30d_pct,
})
