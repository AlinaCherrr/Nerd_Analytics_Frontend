import { useState } from "react"
import styles from "./styles.module.scss"
import { RATING_VALUES } from "./constants"
import type { StarRatingProps } from "./types"

export const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0)

  return (
    <div className={styles.stars}>
      {RATING_VALUES.map((n) => (
        <button
          key={n}
          type="button"
          className={`${styles.star} ${n <= (hover || value) ? styles.starActive : ""}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export type { StarRatingProps } from "./types"
