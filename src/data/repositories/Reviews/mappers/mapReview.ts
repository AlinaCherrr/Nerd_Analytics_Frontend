import type { ReviewDto } from "data/sources/Reviews"
import type { Review } from "../types"

export const mapReview = (dto: ReviewDto): Review => ({
  id: dto.id,
  ticketId: dto.ticket_id,
  clientId: dto.client_id,
  product: dto.product,
  rating: dto.rating,
  comment: dto.comment,
  createdAt: dto.created_at,
  aiSuggestedCategory: dto.ai_suggested_category,
  finalCategory: dto.final_category,
  isAdminChanged: dto.is_admin_changed,
  sentiment: dto.sentiment,
  keywordsPositive: dto.keywords_positive ?? [],
  keywordsNeutral: dto.keywords_neutral ?? [],
  keywordsNegative: dto.keywords_negative ?? [],
  confidence: dto.confidence,
})
