import styles from "./ProfileScreen.module.scss"
import { Sidebar, UserMenu, ProfileCard } from "modules"
import { useProfile } from "domain/Profile"
import { ErrorState } from "shared/ui/ErrorState"

export const ProfileScreen = () => {
  const {
    data: profile, isLoading, isError, refetch,
  } = useProfile()

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Профиль</h1>
          <UserMenu />
        </div>

        <div className={styles.content}>
          {isError && !isLoading ? (
            <ErrorState title="Не удалось загрузить профиль" onRetry={() => void refetch()} />
          ) : (
            <ProfileCard profile={profile} isLoading={isLoading} />
          )}
        </div>
      </main>
    </div>
  )
}
