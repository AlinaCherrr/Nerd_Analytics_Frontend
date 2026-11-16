import type { ChatHistoryProps } from "modules/ChatHistory/types"

export const useChatHistory = ({
  onSelect,
  onNewChat,
  onClose,
}: Pick<ChatHistoryProps, "onSelect" | "onNewChat" | "onClose">) => {
  const handleSelect = (sessionId: string) => {
    onSelect(sessionId)
    onClose?.()
  }

  const handleNewChat = () => {
    onNewChat()
    onClose?.()
  }

  return { handleSelect, handleNewChat }
}
