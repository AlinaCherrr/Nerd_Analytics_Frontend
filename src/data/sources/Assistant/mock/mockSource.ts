import { ApiError } from "shared/http"
import { delay } from "shared/utils/delay"
import type { TicketStatusDto } from "data/sources/TicketStatuses"
import type {
  ChatSessionDto,
  CreateSessionRequest,
  CreateSessionResponse,
  EscalateChatRequest,
  EscalateChatResponse,
  MessageDto,
  SendMessageRequest,
  SendMessageResponse,
  UploadedFileDto,
} from "../types"
import {
  MOCK_AGENT_REPLY,
  MOCK_ATTACHMENT_MESSAGE,
  MOCK_CHAT_SESSION_DTOS,
  MOCK_MESSAGE_DTOS,
} from "./fixtures"

const sessionsStore: ChatSessionDto[] = [...MOCK_CHAT_SESSION_DTOS]
const messagesStore: MessageDto[] = [...MOCK_MESSAGE_DTOS]

const findSessionOrThrow = (chatId: string): ChatSessionDto => {
  const session = sessionsStore.find((s) => s.id === chatId)
  if (!session) throw new ApiError(`Чат ${chatId} не найден`, 404)
  return session
}

const addMessagePair = (chatId: string, content: string) => {
  const userMessage: MessageDto = {
    id: `msg-${Date.now()}-user`,
    chat_id: chatId,
    role: "client",
    message: content || MOCK_ATTACHMENT_MESSAGE,
    created_at: new Date().toISOString(),
  }
  const assistantMessage: MessageDto = {
    id: `msg-${Date.now()}-ai`,
    chat_id: chatId,
    role: "ai",
    message: MOCK_AGENT_REPLY,
    created_at: new Date().toISOString(),
  }
  messagesStore.push(userMessage, assistantMessage)
  return { userMessage, assistantMessage }
}

const setTicketStatus = (chatId: string, status: TicketStatusDto) => {
  const session = findSessionOrThrow(chatId)
  session.ticket_id ??= `ticket-${Date.now()}`
  session.ticket_status = status
  return { ticket_id: session.ticket_id, status }
}

export const assistantMockSource = {
  uploadFiles: async (files: File[]): Promise<UploadedFileDto[]> => {
    await delay(300)
    return files.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}`,
      filename: file.name,
      content_type: file.type,
      size_bytes: file.size,
      created_at: new Date().toISOString(),
    }))
  },

  getSessions: async (): Promise<ChatSessionDto[]> => {
    await delay(300)
    return [...sessionsStore].sort((a, b) => b.updated_at.localeCompare(a.updated_at))
  },

  getMessages: async (chatId: string): Promise<MessageDto[]> => {
    await delay(200)
    return messagesStore.filter((m) => m.chat_id === chatId)
  },

  sendMessage: async (req: SendMessageRequest): Promise<SendMessageResponse> => {
    await delay(800)
    const session = findSessionOrThrow(req.chat_id)
    const { userMessage, assistantMessage } = addMessagePair(req.chat_id, req.content)
    session.updated_at = assistantMessage.created_at
    session.last_message = assistantMessage.message
    return {
      user_message: userMessage,
      assistant_message: assistantMessage,
      ticket_id: session.ticket_id,
      ticket_status: session.ticket_status,
      ticket_title: session.title,
      solution_offered: session.ticket_id !== null,
      escalation: null,
    }
  },

  createSession: async (req: CreateSessionRequest): Promise<CreateSessionResponse> => {
    await delay(800)
    const chatId = `chat-${Date.now()}`
    const { userMessage, assistantMessage } = addMessagePair(chatId, req.first_message)
    const session: ChatSessionDto = {
      id: chatId,
      title: userMessage.message.length > 40 ? userMessage.message.slice(0, 40) + "…" : userMessage.message,
      ticket_id: null,
      ticket_status: null,
      created_at: userMessage.created_at,
      updated_at: assistantMessage.created_at,
      last_message: assistantMessage.message,
    }
    sessionsStore.push(session)
    return {
      session,
      messages: [userMessage, assistantMessage],
      ticket_id: null,
      ticket_status: null,
      ticket_title: null,
      solution_offered: false,
      escalation: null,
    }
  },

  escalateChat: async (req: EscalateChatRequest): Promise<EscalateChatResponse> => {
    await delay(200)
    const { ticket_id, status } = setTicketStatus(req.chat_id, "waiting_for_operator")
    return {
      ticket_id,
      status,
      ai_suggested_category: null,
      final_category: req.category ?? null,
    }
  },

  resolveChat: async (chatId: string): Promise<{ ticket_id: string; status: TicketStatusDto }> => {
    await delay(200)
    return setTicketStatus(chatId, "closed")
  },

  escalateToOperator: async (chatId: string): Promise<{ ticket_id: string; status: TicketStatusDto }> => {
    await delay(200)
    return setTicketStatus(chatId, "waiting_for_operator")
  },
}
