import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateTicket, useCreateGuestTicket } from "domain/Tickets"
import { authRepository } from "data/repositories/Auth"
import { routes } from "shared/utils/routes"
import { getErrorMessage } from "shared/http"
import type { TicketProduct, TicketPriority } from "data/repositories/Tickets"
import type { GuestSuccess } from "../types"

const defaultDeadline = () => {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().slice(0, 10)
}

export const useCreateTicketScreen = () => {
  const navigate = useNavigate()
  const isAuthenticated = authRepository.hasTokens()

  const [product, setProduct] = useState<TicketProduct | "">("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<TicketPriority>("medium")
  const [guestEmail, setGuestEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [guestSuccess, setGuestSuccess] = useState<GuestSuccess | null>(null)

  const { mutateAsync: createTicket, isPending: isPendingAuth } = useCreateTicket()
  const { mutateAsync: createGuestTicket, isPending: isPendingGuest } = useCreateGuestTicket()
  const isPending = isPendingAuth || isPendingGuest

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!product) {
      setError("Выберите продукт")
      return
    }
    if (!isAuthenticated && !description.trim()) {
      setError("Опишите вашу проблему")
      return
    }
    setError(null)

    try {
      if (isAuthenticated) {
        const ticket = await createTicket({
          product,
          priority,
          deadline: new Date(defaultDeadline()).toISOString(),
          description,
        })
        setCreatedId(ticket.id)
      } else {
        await createGuestTicket({
          product,
          priority,
          message: description,
          guestEmail,
        })
        setGuestSuccess({ email: guestEmail })
      }
    } catch (err) {
      setError(getErrorMessage(err, "Не удалось создать обращение. Попробуйте ещё раз."))
    }
  }

  const handleCreateAnotherGuest = () => {
    setProduct("")
    setDescription("")
    setPriority("medium")
    setGuestEmail("")
    setGuestSuccess(null)
  }

  const handleCreateAnother = () => {
    setProduct("")
    setDescription("")
    setPriority("medium")
    setCreatedId(null)
  }

  const goToTickets = () => void navigate(routes.tickets)

  return {
    isAuthenticated,
    product,
    setProduct,
    description,
    setDescription,
    priority,
    setPriority,
    guestEmail,
    setGuestEmail,
    error,
    createdId,
    guestSuccess,
    isPending,
    handleSubmit,
    handleCreateAnotherGuest,
    handleCreateAnother,
    goToTickets,
  }
}
