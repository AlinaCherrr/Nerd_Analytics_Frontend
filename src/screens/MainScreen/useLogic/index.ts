import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "shared/utils/routes"

export const useMainScreen = () => {
  const [promptValue, setPromptValue] = useState("")
  const navigate = useNavigate()

  const handlePromptSubmit = () => {
    if (promptValue.trim()) {
      void navigate(routes.assistant, { state: { initialMessage: promptValue } })
    }
  }

  const handleSidebarSelect = (id: string) => console.log(id)

  const goToCreateTicket = () => void navigate(routes.createTicket)

  const goToFeedback = () => void navigate(routes.feedback)

  return {
    promptValue,
    setPromptValue,
    handlePromptSubmit,
    handleSidebarSelect,
    goToCreateTicket,
    goToFeedback,
  }
}
