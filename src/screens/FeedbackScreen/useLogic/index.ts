import { type FormEvent, useState } from "react"
import { useCreateReview } from "domain/Reviews/useCreateReview"
import { getErrorMessage } from "shared/http"

export const useFeedbackScreen = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { mutateAsync: createReview, isPending } = useCreateReview()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!rating) return
    setError(null)
    try {
      await createReview({ rating, comment: comment || undefined })
      setSubmitted(true)
    } catch (err) {
      setError(getErrorMessage(err, "Не удалось отправить отзыв. Попробуйте ещё раз."))
    }
  }

  const reset = () => {
    setRating(0)
    setComment("")
    setSubmitted(false)
    setError(null)
  }

  return {
    rating,
    setRating,
    comment,
    setComment,
    submitted,
    isPending,
    error,
    handleSubmit,
    reset,
  }
}
