import { useTicketAction } from "domain/Tickets"
import styles from "./styles.module.scss"
import type { TicketActionButtonProps } from "./types"

export const TicketActionButton = ({ ticket }: TicketActionButtonProps) => {
  const runAction = useTicketAction()

  if (!ticket.action || !ticket.actionLabel) return null

  return (
    <button
      type="button"
      className={styles.button}
      onClick={(e) => {
        e.stopPropagation()
        runAction(ticket.id)
      }}
    >
      {ticket.actionLabel}
    </button>
  )
}
