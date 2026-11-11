import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom"
import { routes } from "shared/utils/routes"
import { isChunkLoadError } from "shared/utils/chunkReload"

interface AppErrorView {
  title: string
  description: string
  details: string | null
  isOutdated: boolean
}

const getView = (error: unknown): AppErrorView => {
  if (isRouteErrorResponse(error)) {
    return {
      title: `Ошибка ${error.status}`,
      description: error.statusText || "Не удалось открыть страницу.",
      details: typeof error.data === "string" ? error.data : null,
      isOutdated: false,
    }
  }

  if (isChunkLoadError(error)) {
    return {
      title: "Приложение обновилось",
      description: "Вышла новая версия. Обновите страницу, чтобы продолжить работу.",
      details: null,
      isOutdated: true,
    }
  }

  const details = error instanceof Error ? `${error.message}\n\n${error.stack ?? ""}` : String(error)

  return {
    title: "Что-то пошло не так",
    description: "Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.",
    details,
    isOutdated: false,
  }
}

export const useAppErrorScreen = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  const view = getView(error)

  const handleReload = () => window.location.reload()
  const handleGoHome = () => void navigate(routes.main, { replace: true })

  return {
    ...view,
    showDetails: import.meta.env.DEV && !!view.details,
    handleReload,
    handleGoHome,
  }
}
