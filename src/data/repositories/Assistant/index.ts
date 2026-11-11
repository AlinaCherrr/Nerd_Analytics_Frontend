import { IS_MOCK } from "shared/utils"
import { assistantMockRepository } from "./mockRepository"
import { assistantRealRepository } from "./realRepository"
import type { AssistantRepository } from "./types"

export const assistantRepository: AssistantRepository = IS_MOCK
  ? assistantMockRepository
  : assistantRealRepository

export type {
  AssistantRepository,
  ChatSession,
  Message,
  SendMessageResult,
  CreateSessionResult,
  EscalationInfo,
  EscalateChatInput,
  EscalateChatResult,
} from "./types"
