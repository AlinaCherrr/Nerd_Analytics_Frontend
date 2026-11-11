import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegister } from "domain/Auth/useRegister"
import { authRepository } from "data/repositories/Auth"
import { useMe } from "domain/Auth/useMe"
import { routes } from "shared/utils/routes"
import { getErrorMessage } from "shared/http"
import { ERROR_MAP } from "../constants"
import type { Gender } from "../types"

export const useRegisterScreen = () => {
  const { data: user } = useMe()
  const { mutateAsync: register, isPending } = useRegister()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState<Gender>("")
  const [city, setCity] = useState("")
  const [showOptional, setShowOptional] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shouldRedirect = !!user && authRepository.hasTokens()

  const toggleOptional = () => setShowOptional((v) => !v)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await register({
        username,
        email,
        password,
        ...(fullName && { full_name: fullName }),
        ...(age && { age: Number(age) }),
        ...(gender && { gender }),
        ...(city && { city }),
      })
      void navigate(routes.main, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, "Ошибка сервера", ERROR_MAP))
    }
  }

  return {
    shouldRedirect,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    age,
    setAge,
    gender,
    setGender,
    city,
    setCity,
    showOptional,
    toggleOptional,
    error,
    isPending,
    handleSubmit,
  }
}
