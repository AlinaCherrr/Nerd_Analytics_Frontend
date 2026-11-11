import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import styles from "./styles.module.scss"
import type { SidebarProps } from "./types"
import { NAVIGATION_ITEMS, SIDEBAR_STORAGE_KEY } from "./constants"
import Logo from "public/Logo-label.png"
import IconLogo from "public/logo.png"
import { LiquidWrapper } from "shared/ui/LiquidWrapper"
import { useNotifications } from "domain/Notifications"

export const Sidebar = ({ onSelect }: SidebarProps) => {
  const location = useLocation()
  const { data: notifications = [] } = useNotifications()
  const unreadCount = notifications.filter((n) => !n.isRead).length
  const [isCompact, setIsCompact] = useState(
    () => localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true",
  )

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCompact))
  }, [isCompact])

  return (
    <aside className={`${styles.sidebar} ${isCompact ? styles.compact : ""}`}>
      <div className={styles.logoContainer}>
        {isCompact && (
          <img
            className={styles.iconLogo}
            src={IconLogo}
            alt="Nerd Logo"
          />
        )}
        {!isCompact && (
          <img className={styles.logo} src={Logo} alt="Nerd Analytics Logo" />
        )}
      </div>

      <nav className={styles.navigation}>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.id}
              to={item.path}
              className={styles.navLink}
              title={isCompact ? item.label : undefined}
              onClick={() => onSelect?.(item.id)}
            >
              <LiquidWrapper isActive={isActive} className={styles.navItem}>
                <div className={styles.left}>
                  <Icon size={20} />
                  {!isCompact && <span>{item.label}</span>}
                </div>
                {item.id === "notifications" && unreadCount > 0 && (
                  <LiquidWrapper alwaysActive>
                    <div className={`${styles.badge} ${isCompact ? styles.badgeCompact : ""}`}>
                      {!isCompact && unreadCount}
                      {isCompact && <span className={styles.badgeDot} />}
                    </div>
                  </LiquidWrapper>
                )}
              </LiquidWrapper>
            </Link>
          )
        })}
      </nav>

      <button
        className={styles.toggleButton}
        onClick={() => setIsCompact(!isCompact)}
        title={isCompact ? "Развернуть" : "Свернуть"}
      >
        {isCompact ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
      </button>
    </aside>
  )
}
