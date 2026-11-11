import type { TicketStatus } from "data/repositories/TicketStatuses"

export interface ChatSession {
  id: string
  title: string
  ticketId: string | null
  ticketStatus: TicketStatus | null
  createdAt: string
  updatedAt: string
  lastMessage?: string
}

export interface Message {
  id: string
  sessionId: string
  role: "user" | "assistant"
  content: string
  createdAt: string
  ticketId?: string | null
}

export interface EscalationInfo {
  required: boolean
  suggestedProduct: string | null
  suggestedCategory: string | null
  confidence: number | null
  products: string[]
  categories: string[]
  priorities: string[]
  priorityLabels: Record<string, string>
}

export interface SendMessageResult {
  userMessage: Message
  assistantMessage: Message
  solutionOffered: boolean
  ticketId: string | null
  ticketStatus: TicketStatus | null
  ticketTitle: string | null
  escalation: EscalationInfo | null
}

export interface CreateSessionResult {
  session: ChatSession
  messages: Message[]
  solutionOffered: boolean
  ticketId: string | null
  ticketStatus: TicketStatus | null
  ticketTitle: string | null
  escalation: EscalationInfo | null
}

export interface EscalateChatInput {
  chatId: string
  product: string
  userPriority: string
  category?: string
  description?: string
}

export interface EscalateChatResult {
  ticketId: string
  status: TicketStatus
  aiSuggestedCategory: string | null
  finalCategory: string | null
}

export interface AssistantRepository {
  getSessions: () => Promise<ChatSession[]>
  getMessages: (sessionId: string) => Promise<Message[]>
  sendMessage: (sessionId: string, content: string, files?: File[]) => Promise<SendMessageResult>
  createSession: (firstMessage: string, files?: File[]) => Promise<CreateSessionResult>
  escalateChat: (input: EscalateChatInput) => Promise<EscalateChatResult>
  resolveChat: (chatId: string) => Promise<{ ticket_id: string; status: TicketStatus }>
  escalateToOperator: (chatId: string) => Promise<{ ticket_id: string; status: TicketStatus }>
}
