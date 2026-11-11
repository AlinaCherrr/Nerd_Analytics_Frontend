import { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useChatSessions } from "domain/Assistant/useChatSessions"
import { useMessages } from "domain/Assistant/useMessages"
import { useSendMessage } from "domain/Assistant/useSendMessage"
import { useCreateSession } from "domain/Assistant/useCreateSession"
import { useResolveChat } from "domain/Assistant/useResolveChat"
import type { CreateSessionResult } from "data/repositories/Assistant"
import { getErrorMessage } from "shared/http"
import { TICKET_STATUS, type TicketStatus } from "data/repositories/TicketStatuses"
import type { AssistantLocationState, TicketInfo } from "../types"

export const useAssistantScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const initialMessage = (location.state as AssistantLocationState)?.initialMessage
  const [activeSessionId, setActiveSessionId] = useState<string | null | undefined>(() =>
    initialMessage?.trim() ? null : undefined,
  )
  const [inputValue, setInputValue] = useState("")
  const [pendingFirstMessage, setPendingFirstMessage] = useState<string | null>(() =>
    initialMessage?.trim() ? initialMessage : null,
  )
  const [ticketStatusOverride, setTicketStatusOverride] = useState<TicketStatus | null>(null)
  const [ticketTitle, setTicketTitle] = useState<string | null>(null)
  const [solutionOffered, setSolutionOffered] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const autoSentRef = useRef(false)

  const {
    data: sessions = [],
    isLoading: sessionsLoading,
    isError: sessionsError,
    refetch: refetchSessions,
  } = useChatSessions()

  const effectiveSessionId =
    activeSessionId !== undefined ? activeSessionId : (sessions[0]?.id ?? null)
  const activeSession = sessions.find((s) => s.id === effectiveSessionId)
  const ticketStatus = ticketStatusOverride ?? activeSession?.ticketStatus ?? null

  const {
    data: messages = [],
    isLoading: messagesLoading,
    isError: messagesError,
    refetch: refetchMessages,
  } = useMessages(effectiveSessionId)
  const sendMessage = useSendMessage(effectiveSessionId)
  const { mutate: resolveChat, isPending: isResolving } = useResolveChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, pendingFirstMessage])

  const applyTicketInfo = (info: TicketInfo) => {
    setTicketStatusOverride(info.ticketStatus)
    setTicketTitle(info.ticketTitle)
    setSolutionOffered(info.solutionOffered)
  }

  const resetTicketInfo = () => {
    setTicketStatusOverride(null)
    setTicketTitle(null)
    setSolutionOffered(false)
  }

  const handleSessionCreated = (result: CreateSessionResult) => {
    setActiveSessionId(result.session.id)
    setInputValue("")
    setPendingFirstMessage(null)
    applyTicketInfo(result)
  }

  const createSession = useCreateSession(handleSessionCreated)

  useEffect(() => {
    if (autoSentRef.current) return
    if (initialMessage?.trim()) {
      autoSentRef.current = true
      createSession.mutate(
        { firstMessage: initialMessage },
        {
          onError: (err) => {
            setPendingFirstMessage(null)
            setInputValue(initialMessage)
            setChatError(getErrorMessage(err, "Не удалось начать чат. Попробуйте ещё раз."))
          },
        },
      )
      void navigate(location.pathname, { replace: true, state: null })
    }
  }, [createSession, initialMessage, navigate, location.pathname])

  const handleSend = (files: File[]) => {
    const text = inputValue.trim()
    if (!text && files.length === 0) return

    setChatError(null)

    if (!effectiveSessionId) {
      setPendingFirstMessage(text || `[${files.map((f) => f.name).join(", ")}]`)
      setInputValue("")
      createSession.mutate(
        { firstMessage: text, files },
        {
          onError: (err) => {
            setPendingFirstMessage(null)
            setInputValue(text)
            setChatError(getErrorMessage(err, "Не удалось начать чат. Попробуйте ещё раз."))
          },
        },
      )
    } else {
      sendMessage.mutate(
        { content: text, files },
        {
          onSuccess: applyTicketInfo,
          onError: (err) => {
            setInputValue(text)
            setChatError(getErrorMessage(err, "Не удалось отправить сообщение. Попробуйте ещё раз."))
          },
        },
      )
      setInputValue("")
    }
  }

  const handleNewChat = () => {
    setActiveSessionId(null)
    setInputValue("")
    setPendingFirstMessage(null)
    setChatError(null)
    resetTicketInfo()
  }

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id)
    setChatError(null)
    resetTicketInfo()
  }

  const handleResolve = () => {
    if (!effectiveSessionId) return
    setChatError(null)
    resolveChat(effectiveSessionId, {
      onSuccess: () => setTicketStatusOverride(TICKET_STATUS.closed),
      onError: (err) => setChatError(getErrorMessage(err, "Не удалось закрыть обращение. Попробуйте ещё раз.")),
    })
  }

  const isSending = sendMessage.isPending || createSession.isPending
  const isChatClosed = ticketStatus === TICKET_STATUS.closed
  const isWaitingForOperator = ticketStatus === TICKET_STATUS.waitingForOperator
  const isChatBlocked = isChatClosed || isWaitingForOperator

  const uniqueMessages = messages.filter(
    (msg, idx, arr) => arr.findIndex((m) => m.id === msg.id) === idx,
  )

  const hasAssistantResponse = uniqueMessages.some((m) => m.role === "assistant")
  const showResolveButton =
    !isSending &&
    !isChatBlocked &&
    solutionOffered &&
    hasAssistantResponse &&
    !!effectiveSessionId

  return {
    sessions,
    sessionsLoading,
    sessionsError,
    refetchSessions: () => void refetchSessions(),
    effectiveSessionId,
    activeSession,
    ticketTitle,
    inputValue,
    setInputValue,
    pendingFirstMessage,
    messagesLoading,
    messagesError,
    refetchMessages: () => void refetchMessages(),
    chatError,
    uniqueMessages,
    messagesEndRef,
    isSending,
    isChatClosed,
    isWaitingForOperator,
    isChatBlocked,
    showResolveButton,
    isResolving,
    handleSend,
    handleNewChat,
    handleSelectSession,
    handleResolve,
  }
}
