import { MessageSquareOff } from "lucide-react"
import { ErrorState } from "shared/ui/ErrorState"
import styles from "./styles.module.scss"
import { Sidebar, UserMenu, ReviewCard } from "modules"
import { RATING_OPTIONS, SENTIMENT_FILTERS } from "./constants"
import { useMyReviewsScreen } from "./useLogic"

export const MyReviewsScreen = () => {
  const {
    sentimentFilter,
    setSentimentFilter,
    ratingFilter,
    setRatingFilter,
    reviews,
    isLoading,
    isError,
    retry,
    filtered,
    countBySentiment,
    avgRating,
    positiveCount,
    negativeCount,
  } = useMyReviewsScreen()

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Мои отзывы</h1>
          <UserMenu />
        </div>

        <div className={styles.content}>
          {!isLoading && reviews.length > 0 && (
            <div className={styles.statsBar}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{reviews.length}</span>
                <span className={styles.statLabel}>Всего отзывов</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{avgRating}</span>
                <span className={styles.statLabel}>Средняя оценка</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{positiveCount}</span>
                <span className={styles.statLabel}>Позитивных</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{negativeCount}</span>
                <span className={styles.statLabel}>Негативных</span>
              </div>
            </div>
          )}

          <div className={styles.toolbar}>
            <div className={styles.tabs}>
              {SENTIMENT_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`${styles.tab} ${sentimentFilter === value ? styles.tabActive : ""}`}
                  onClick={() => setSentimentFilter(value)}
                >
                  <span>{label}</span>
                  {!isLoading && (
                    <span className={styles.tabCount}>{countBySentiment(value)}</span>
                  )}
                </button>
              ))}
            </div>

            <div className={styles.ratingFilter}>
              <button
                className={`${styles.ratingBtn} ${ratingFilter === 0 ? styles.ratingBtnActive : ""}`}
                onClick={() => setRatingFilter(0)}
              >
                Все оценки
              </button>
              {RATING_OPTIONS.map((n) => (
                <button
                  key={n}
                  className={`${styles.ratingBtn} ${ratingFilter === n ? styles.ratingBtnActive : ""}`}
                  onClick={() => setRatingFilter(n)}
                >
                  {"★".repeat(n)}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className={styles.loading}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          )}

          {!isLoading && isError && (
            <ErrorState title="Не удалось загрузить отзывы" onRetry={retry} />
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <MessageSquareOff size={36} />
              </div>
              <h2 className={styles.emptyTitle}>
                {reviews.length === 0 ? "Отзывов ещё нет" : "Нет отзывов по фильтру"}
              </h2>
              <p className={styles.emptySubtitle}>
                {reviews.length === 0
                  ? "Вы ещё не оставляли отзывов. Поделитесь впечатлением о сервисе!"
                  : "Попробуйте изменить фильтры"}
              </p>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className={styles.list}>
              {filtered.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
