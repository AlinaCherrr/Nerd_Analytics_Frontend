import styles from "./SettingsScreen.module.scss"
import {
 Sidebar, UserMenu, EditProfileForm, ChangePasswordForm 
} from "modules"
import { useProfile } from "domain/Profile"
import { ErrorState } from "shared/ui/ErrorState"

export const SettingsScreen = () => {
  const {
    data: profile, isLoading: isProfileLoading, isError: isProfileError, refetch,
  } = useProfile()

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Настройки</h1>
          <UserMenu />
        </div>

        <div className={styles.content}>
          {isProfileError && !isProfileLoading ? (
            <ErrorState title="Не удалось загрузить данные профиля" onRetry={() => void refetch()} />
          ) : (
            <EditProfileForm profile={profile} isProfileLoading={isProfileLoading} />
          )}
          <ChangePasswordForm />
        </div>
      </main>
    </div>
  )
}
