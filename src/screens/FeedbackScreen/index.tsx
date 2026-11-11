import { CheckCircle } from "lucide-react"
import { Sidebar, UserMenu } from "modules"
import { StarRating } from "shared/ui/StarRating"
import { routes } from "shared/utils/routes"
import { BackLink } from "shared/ui/BackLink"
import styles from "./FeedbackScreen.module.scss"
import { useFeedbackScreen } from "./useLogic"

export const FeedbackScreen = () => {
  const {
    rating,
    setRating,
    comment,
    setComment,
    submitted,
    isPending,
    error,
    handleSubmit,
    reset,
  } = useFeedbackScreen()

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Написать отзыв</h1>
          <UserMenu />
        </div>

        <div className={styles.backBar}>
          <BackLink to={routes.main}>Назад</BackLink>
        </div>

        <div className={styles.content}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <CheckCircle size={36} />
              </div>
              <h2 className={styles.successTitle}>Спасибо за отзыв!</h2>
              <p className={styles.successSubtitle}>Ваш отзыв поможет нам стать лучше</p>
              <button className={styles.newBtn} onClick={reset}>
                Написать ещё
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={(e) => void handleSubmit(e)}>
              <div className={styles.field}>
                <span className={styles.label}>Оценка *</span>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="comment">
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  className={styles.textarea}
                  placeholder="Расскажите подробнее..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              <button className={styles.submit} type="submit" disabled={isPending || !rating}>
                {isPending ? "Отправляем..." : "Отправить отзыв"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
