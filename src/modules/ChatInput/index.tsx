import {
 Send, Loader2, Mic, MicOff, Plus, X 
} from "lucide-react"
import {
 type KeyboardEvent, useRef, useEffect, useState, useCallback 
} from "react"
import clsx from "clsx"
import styles from "./styles.module.scss"
import type {
  ChatInputProps,
  SpeechRecognitionConstructor,
  SpeechRecognitionInstance,
  SpeechRecognitionResultEvent,
} from "./types"

const speechWindow = window as Window & {
  SpeechRecognition?: SpeechRecognitionConstructor
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

const SpeechRecognitionAPI =
  speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null

export const ChatInput = ({
  value,
  onChange,
  onSubmit,
  disabled,
  loading,
  placeholder = "Напишите сообщение…",
}: ChatInputProps) => {
  const isInputDisabled = disabled || loading
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isInputDisabled && value.trim()) {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    const files = attachedFiles
    setAttachedFiles([])
    onSubmit(files)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    setAttachedFiles((prev) => [...prev, ...files])
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleRecording = useCallback(() => {
    if (!SpeechRecognitionAPI) return

    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
      return
    }

     
    const recognition = new SpeechRecognitionAPI()
    recognition.lang = "ru-RU"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      const transcript: string = event.results[0]?.[0]?.transcript ?? ""
      if (transcript) {
        onChange(value ? `${value} ${transcript}` : transcript)
      }
    }

    recognition.onend = () => setIsRecording(false)
    recognition.onerror = () => setIsRecording(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [isRecording, value, onChange])

  return (
    <div className={styles.wrapper}>
      {attachedFiles.length > 0 && (
        <div className={styles.attachments}>
          {attachedFiles.map((file, i) => (
            <div key={i} className={styles.fileChip}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                type="button"
                className={styles.removeFile}
                onClick={() => removeFile(i)}
                title="Удалить файл"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.inputRow}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.md,.xlsx,.xls,.csv"
          className={styles.hiddenFileInput}
          onChange={handleFileChange}
        />
        <button
          className={styles.iconAction}
          type="button"
          title="Прикрепить файл"
          onClick={() => fileInputRef.current?.click()}
          disabled={isInputDisabled}
        >
          <Plus size={16} />
        </button>

        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isInputDisabled}
        />

        <div className={styles.rightActions}>
          <button
            className={clsx(styles.iconAction, isRecording && styles.iconActionRecording)}
            type="button"
            title={
              !SpeechRecognitionAPI
                ? "Голосовой ввод недоступен в этом браузере"
                : isRecording
                  ? "Остановить запись"
                  : "Голосовой ввод"
            }
            onClick={toggleRecording}
            disabled={isInputDisabled || !SpeechRecognitionAPI}
          >
            {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <button
            className={styles.sendButton}
            type="button"
            onClick={handleSubmit}
            disabled={isInputDisabled || !value.trim()}
            title="Отправить"
          >
            {loading ? (
              <Loader2 size={18} className={styles.spinner} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
      <p className={styles.hint}>Enter — отправить · Shift+Enter — новая строка</p>
    </div>
  )
}
