import type { MessageDto } from "data/sources/Assistant"
import type { Message } from "../types"

export const mapMessage = (dto: MessageDto): Message => ({
  id: dto.id,
  sessionId: dto.chat_id,
  role: dto.role === "client" ? "user" : "assistant",
  content: dto.message,
  createdAt: dto.created_at,
})
