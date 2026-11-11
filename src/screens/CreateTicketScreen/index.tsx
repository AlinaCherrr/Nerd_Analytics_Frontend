import { Link } from "react-router-dom"
import { CheckCircle, Mail } from "lucide-react"
import { Sidebar, UserMenu } from "modules"
import { TICKET_PRIORITY_LABELS, TICKET_PRODUCTS } from "domain/Tickets"
import { routes } from "shared/utils/routes"
import type { TicketProduct, TicketPriority } from "data/repositories/Tickets"
import { BackLink } from "shared/ui/BackLink"
import styles from "./CreateTicketScreen.module.scss"
import { useCreateTicketScreen } from "./useLogic"

export const CreateTicketScreen = () => {
  const {
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
  } = useCreateTicketScreen()

  if (guestSuccess) {
    return (
      <div className={styles.page}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Создать обращение</h1>
            <UserMenu />
          </div>

          <div className={styles.backBar}>
            <BackLink to={routes.main}>Назад</BackLink>
          </div>
          <div className={styles.content}>
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <CheckCircle size={36} />
              </div>
              <h2 className={styles.successTitle}>Обращение создано</h2>
              <p className={styles.successSubtitle}>
                Ссылка для отслеживания статуса отправлена на{" "}
                <strong className={styles.emailHighlight}>{guestSuccess.email}</strong>
              </p>
              <div className={styles.registerCard}>
                <div className={styles.registerCardIcon}>
                  <Mail size={20} />
                </div>
                <div>
                  <p className={styles.registerCardTitle}>Зарегистрируйтесь, чтобы удобнее отслеживать обращения</p>
                  <p className={styles.registerCardText}>
                    В личном кабинете видны все ваши обращения, история статусов и уведомления.
                  </p>
                </div>
              </div>
              <div className={styles.successActions}>
                <button className={styles.newBtn} onClick={handleCreateAnotherGuest}>
                  Создать ещё
                </button>
                <Link to={routes.register} className={styles.newBtn}>
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (createdId) {
    return (
      <div className={styles.page}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Создать обращение</h1>
            <UserMenu />
          </div>

          <div className={styles.backBar}>
            <BackLink to={routes.main}>Назад</BackLink>
          </div>
          <div className={styles.content}>
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <CheckCircle size={36} />
              </div>
              <h2 className={styles.successTitle}>Обращение создано</h2>
              <p className={styles.successSubtitle}>
                Мы рассмотрим ваше обращение в ближайшее время
              </p>
              <div className={styles.successActions}>
                <button className={styles.newBtn} onClick={handleCreateAnother}>
                  Создать ещё
                </button>
                <button className={styles.newBtn} onClick={goToTickets}>
                  Мои обращения
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Создать обращение</h1>
          <UserMenu />
        </div>

        <div className={styles.backBar}>
          <BackLink to={routes.main}>Назад</BackLink>
        </div>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={(e) => void handleSubmit(e)}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="product">
                Продукт *
              </label>
              <select
                id="product"
                className={styles.select}
                value={product}
                onChange={(e) => setProduct(e.target.value as TicketProduct)}
                required
              >
                <option value="">Выберите продукт</option>
                {TICKET_PRODUCTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">
                Описание проблемы {!isAuthenticated && "*"}
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="Опишите вашу проблему подробнее..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={!isAuthenticated}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="priority">
                Приоритет
              </label>
              <select
                id="priority"
                className={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
              >
                {Object.entries(TICKET_PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {!isAuthenticated && (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="guestEmail">
                  Email для уведомления *
                </label>
                <input
                  id="guestEmail"
                  type="email"
                  className={styles.input}
                  placeholder="your@email.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                />
                <span className={styles.fieldHint}>
                  Мы отправим ссылку для отслеживания статуса обращения
                </span>
              </div>
            )}

            {error && <div className={styles.error}>{error}</div>}

            <button className={styles.submit} type="submit" disabled={isPending}>
              {isPending ? "Создаём..." : "Создать обращение"}
            </button>

            {!isAuthenticated && (
              <p className={styles.loginHint}>
                Уже есть аккаунт?{" "}
                <Link to={routes.login} className={styles.loginLink}>
                  Войти
                </Link>
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}
