import type { AiAccuracyDto } from "data/sources/Analytics"
import type { AiAccuracy } from "../types"

export const mapAiAccuracy = (dto: AiAccuracyDto): AiAccuracy => ({
  totalClassified: dto.total_classified,
  adminChanged: dto.admin_changed,
  accuracyRate: dto.accuracy_rate,
})
