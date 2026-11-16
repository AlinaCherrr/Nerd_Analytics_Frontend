import { useEffect, useSyncExternalStore } from "react"
import { MOBILE_MEDIA_QUERY } from "shared/constants/breakpoints"

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )

export const useIsMobile = () => useMediaQuery(MOBILE_MEDIA_QUERY)

export const useDrawer = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const prevOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", handleKey)
    }
  }, [isOpen, onClose])
}
