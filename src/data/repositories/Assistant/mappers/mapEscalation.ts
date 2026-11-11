import type { EscalationOffer } from "data/sources/Assistant"
import type { EscalationInfo } from "../types"

export const mapEscalation = (dto: EscalationOffer | null | undefined): EscalationInfo | null => {
  if (!dto) return null
  return {
    required: dto.required,
    suggestedProduct: dto.suggested_product,
    suggestedCategory: dto.suggested_category,
    confidence: dto.confidence,
    products: dto.products,
    categories: dto.categories,
    priorities: dto.priorities,
    priorityLabels: dto.priority_labels,
  }
}
