import { routes } from "shared/utils/routes"
import { BackLink } from "../BackLink"
import styles from "./styles.module.scss"

export const ContinueAsGuestLink = () => (
  <BackLink to={routes.main} className={styles.link}>
    Продолжить без аутентификации
  </BackLink>
)
