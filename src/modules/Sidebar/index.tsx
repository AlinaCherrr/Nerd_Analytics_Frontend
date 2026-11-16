import { useState, useEffect, useCallback } from "react"
import { Link, useLocation } from "react-router-dom"
import {
 ChevronsLeft, ChevronsRight, Menu, X
} from "lucide-react"
import clsx from "clsx"
import styles from "./styles.module.scss"
import type { SidebarProps } from "./types"
import { NAVIGATION_ITEMS, SIDEBAR_STORAGE_KEY } from "./constants"
import Logo from "public/Logo-label.png"
import IconLogo from "public/logo.png"
import { LiquidWrapper } from "shared/ui/LiquidWrapper"
import { useNotifications } from "domain/Notifications"
import { useDrawer, useIsMobile } from "shared/hooks/useMediaQuery"

export const Sidebar = ({ onSelect }: SidebarProps) => {
  const location = useLocation()
  const { data: notifications = [] } = useNotifications()
  const unreadCount = notifications.filter((n) => !n.isRead).length
  const isMobile = useIsMobile()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCompactSaved, setIsCompact] = useState(
    () => localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true",
  )
  const isCompact = isCompactSaved && !isMobile
  const isDrawerOpen = isMobile && isMobileOpen

  const closeDrawer = useCallback(() => setIsMobileOpen(false), [])
  useDrawer(isDrawerOpen, closeDrawer)

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCompactSaved))
  }, [isCompactSaved])

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        onClick={() => setIsMobileOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={isDrawerOpen}
      >
        <Menu size={22} />
        {unreadCount > 0 && <span className={styles.burgerDot} />}
      </button>

      <div
        className={clsx(styles.backdrop, isDrawerOpen && styles.backdropVisible)}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className={clsx(
          styles.sidebar,
          isCompact && styles.compact,
          isDrawerOpen && styles.mobileOpen,
        )}
        aria-hidden={isMobile && !isDrawerOpen ? true : undefined}
        inert={isMobile && !isDrawerOpen ? true : undefined}
      >
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
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeDrawer}
            aria-label="Закрыть меню"
          >
            <X size={22} />
          </button>
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
                onClick={() => {
                  onSelect?.(item.id)
                  closeDrawer()
                }}
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
          onClick={() => setIsCompact(!isCompactSaved)}
          title={isCompact ? "Развернуть" : "Свернуть"}
        >
          {isCompact ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </aside>
    </>
  )
}
