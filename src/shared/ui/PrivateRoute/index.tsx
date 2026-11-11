import { Navigate, Outlet } from "react-router-dom"
import { useMe } from "domain/Auth/useMe"
import { authRepository } from "data/repositories/Auth"
import { routes } from "shared/utils/routes"
import { PageLoader } from "../PageLoader"

export const PrivateRoute = () => {
  const { data: user, isLoading } = useMe()

  if (!authRepository.hasTokens()) {
    return <Navigate to={routes.login} replace />
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to={routes.login} replace />
  }

  return <Outlet />
}
