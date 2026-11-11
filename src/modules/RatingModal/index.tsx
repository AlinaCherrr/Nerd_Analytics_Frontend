import { StarRating } from "shared/ui/StarRating"
import styles from "./styles.module.scss"
import type { RatingModalProps } from "./types"
import { useRatingModal } from "./useLogic"

export const RatingModal = (props: RatingModalProps) => {
  const { onClose } = props
  const {
    rating, setRating, comment, setComment, isPending, error, handleSubmit,
  } = useRatingModal(props)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Оценить обращение</h2>
        <div>
          <p className={styles.modalLabel}>Оценка *</p>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <textarea
          className={styles.modalTextarea}
          placeholder="Оставьте комментарий (необязательно)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Отмена
          </button>
          <button
            className={styles.submitBtn}
            disabled={!rating || isPending}
            onClick={() => void handleSubmit()}
          >
            {isPending ? "Отправляем..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  )
}

export type { RatingModalProps } from "./types"
