import { assistantMockSource } from "data/sources/Assistant/mock/mockSource"
import { mapEscalation, mapMessage, mapSession } from "./mappers"
import type { AssistantRepository } from "./types"

export const assistantMockRepository: AssistantRepository = {
  getSessions: async () => {
    const dtos = await assistantMockSource.getSessions()
    return dtos.map(mapSession)
  },

  getMessages: async (sessionId) => {
    const dtos = await assistantMockSource.getMessages(sessionId)
    return dtos.map(mapMessage)
  },

  sendMessage: async (sessionId, content, files) => {
    let file_ids: string[] | undefined
    if (files?.length) {
      const uploaded = await assistantMockSource.uploadFiles(files)
      file_ids = uploaded.map((f) => f.id)
    }
    const res = await assistantMockSource.sendMessage({ chat_id: sessionId, content, file_ids })
    return {
      userMessage: mapMessage(res.user_message),
      assistantMessage: mapMessage(res.assistant_message),
      solutionOffered: res.solution_offered,
      ticketId: res.ticket_id,
      ticketStatus: res.ticket_status,
      ticketTitle: res.ticket_title,
      escalation: mapEscalation(res.escalation),
    }
  },

  createSession: async (firstMessage, files) => {
    let file_ids: string[] | undefined
    if (files?.length) {
      const uploaded = await assistantMockSource.uploadFiles(files)
      file_ids = uploaded.map((f) => f.id)
    }
    const res = await assistantMockSource.createSession({ first_message: firstMessage, file_ids })
    return {
      session: mapSession(res.session),
      messages: res.messages.map(mapMessage),
      solutionOffered: res.solution_offered,
      ticketId: res.ticket_id,
      ticketStatus: res.ticket_status,
      ticketTitle: res.ticket_title,
      escalation: mapEscalation(res.escalation),
    }
  },

  escalateChat: async (input) => {
    const res = await assistantMockSource.escalateChat({
      chat_id: input.chatId,
      product: input.product,
      user_priority: input.userPriority,
      category: input.category,
      description: input.description,
    })
    return {
      ticketId: res.ticket_id,
      status: res.status,
      aiSuggestedCategory: res.ai_suggested_category,
      finalCategory: res.final_category,
    }
  },

  resolveChat: async (chatId) => {
    return assistantMockSource.resolveChat(chatId)
  },

  escalateToOperator: async (chatId) => {
    return assistantMockSource.escalateToOperator(chatId)
  },
}
