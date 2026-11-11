import { useState } from "react"
import { useCreateReview } from "domain/Reviews/useCreateReview"
import { getErrorMessage } from "shared/http"
import type { RatingModalProps } from "../../types"

export const useRatingModal = ({ ticketId, product, onClose }: RatingModalProps) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: createReview, isPending } = useCreateReview()

  const handleSubmit = async () => {
    if (!rating) return
    setError(null)
    try {
      await createReview({ ticketId, product, rating, comment: comment || undefined })
      onClose()
    } catch (err) {
      setError(getErrorMessage(err, "Не удалось отправить отзыв. Попробуйте ещё раз."))
    }
  }

  return {
    rating,
    setRating,
    comment,
    setComment,
    isPending,
    error,
    handleSubmit,
  }
}
