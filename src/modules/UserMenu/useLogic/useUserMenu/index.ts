import {
 useEffect, useRef, useState, type MouseEvent 
} from "react"
import { useQueryClient } from "@tanstack/react-query"
import { authRepository } from "data/repositories/Auth"
import { clearAuthSession } from "domain/Auth/clearAuthSession"
import { useProfile } from "domain/Profile"
import { routes } from "shared/utils/routes"

export const useUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const hasTokens = authRepository.hasTokens()
  const { data: profile, isLoading } = useProfile()

  const displayName = profile?.fullName ?? profile?.authUsername ?? ""

  const toggle = () => setIsOpen((v) => !v)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)
    await clearAuthSession(queryClient)
    window.location.assign(routes.login)
  }

  return {
    profile: hasTokens ? profile : undefined,
    isLoading: hasTokens && isLoading,
    isOpen,
    menuRef,
    displayName,
    toggle,
    handleLogout,
  }
}
