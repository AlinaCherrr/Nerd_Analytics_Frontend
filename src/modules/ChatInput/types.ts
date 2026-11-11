export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (files: File[]) => void
  disabled?: boolean
  /** Идёт отправка сообщения — показывает спиннер на кнопке отправки */
  loading?: boolean
  placeholder?: string
}

export interface SpeechRecognitionInstance {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

export interface SpeechRecognitionResultEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>
}

export type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance
