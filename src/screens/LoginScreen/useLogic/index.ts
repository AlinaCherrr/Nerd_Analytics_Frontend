import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authRepository } from "data/repositories/Auth"
import { useLogin } from "domain/Auth/useLogin"
import { useMe } from "domain/Auth/useMe"
import { routes } from "shared/utils/routes"
import { getErrorMessage } from "shared/http"

export const useLoginScreen = () => {
  const { data: user } = useMe()
  const { mutateAsync: login, isPending } = useLogin()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const shouldRedirect = !!user && authRepository.hasTokens()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login({ username, password })
      void navigate(routes.main, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, "Ошибка сервера"))
    }
  }

  return {
    shouldRedirect,
    username,
    setUsername,
    password,
    setPassword,
    error,
    isPending,
    handleSubmit,
  }
}
