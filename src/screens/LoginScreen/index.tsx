import { Link, Navigate } from "react-router-dom"
import { routes } from "shared/utils/routes"
import { ContinueAsGuestLink } from "shared/ui/ContinueAsGuestLink"
import styles from "./styles.module.scss"
import { useLoginScreen } from "./useLogic"

export const LoginScreen = () => {
  const {
    shouldRedirect,
    username,
    setUsername,
    password,
    setPassword,
    error,
    isPending,
    handleSubmit,
  } = useLoginScreen()

  if (shouldRedirect) return <Navigate to={routes.main} replace />

  return (
    <div className={styles.page}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <ContinueAsGuestLink />

      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Nerd" />
        </div>

        <h1 className={styles.title}>Добро пожаловать</h1>
        <p className={styles.subtitle}>Войдите в свой аккаунт</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={(e) => void handleSubmit(e)}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Имя пользователя
            </label>
            <input
              id="username"
              className={styles.input}
              type="text"
              placeholder="user01"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.button} type="submit" disabled={isPending}>
            {isPending ? "Входим..." : "Войти"}
          </button>
        </form>

        <p className={styles.footer}>
          Нет аккаунта?{" "}
          <Link to={routes.register}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  )
}
