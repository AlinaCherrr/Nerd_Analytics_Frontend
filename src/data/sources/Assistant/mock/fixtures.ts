import { ApiError } from "shared/http"
import { MOCK_TICKET_DTOS } from "data/sources/Tickets/mock/fixtures"
import type { TicketStatusDto } from "data/sources/TicketStatuses"
import type { ChatSessionDto, MessageDto } from "../types"

export const MOCK_AGENT_REPLY = "Привет, сейчас разберемся!"
export const MOCK_ATTACHMENT_MESSAGE = "[Вложение]"

const getTicketStatus = (ticketId: string): TicketStatusDto => {
  const ticket = MOCK_TICKET_DTOS.find((t) => t.id === ticketId)
  if (!ticket) throw new ApiError(`Обращение ${ticketId} не найдено`, 404)
  return ticket.status
}

export const MOCK_CHAT_SESSION_DTOS: ChatSessionDto[] = [
  {
    id: "chat-ticket-1",
    title: "Принтер не печатает после обновления",
    ticket_id: "ticket-1",
    ticket_status: getTicketStatus("ticket-1"),
    created_at: "2025-05-28T10:00:00Z",
    updated_at: "2025-05-28T10:11:00Z",
    last_message: "Передаю обращение оператору, он подключится в ближайшее время.",
  },
  {
    id: "chat-ticket-2",
    title: "Обрывается соединение с веб-сервисом",
    ticket_id: "ticket-2",
    ticket_status: getTicketStatus("ticket-2"),
    created_at: "2025-05-30T14:20:00Z",
    updated_at: "2025-05-30T14:21:00Z",
    last_message: "Перезагрузите роутер и напишите, вернулось ли соединение.",
  },
  {
    id: "chat-ticket-3",
    title: "Пропали файлы в личном кабинете",
    ticket_id: "ticket-3",
    ticket_status: getTicketStatus("ticket-3"),
    created_at: "2025-05-29T08:30:00Z",
    updated_at: "2025-05-29T11:45:00Z",
    last_message: "Рад, что всё получилось! Закрываю обращение.",
  },
  {
    id: "chat-ticket-4",
    title: "Ошибка подключения к API через VPN",
    ticket_id: "ticket-4",
    ticket_status: getTicketStatus("ticket-4"),
    created_at: "2025-06-01T07:15:00Z",
    updated_at: "2025-06-01T07:40:00Z",
    last_message: "Здравствуйте, я оператор. Проверяю настройки VPN на нашей стороне.",
  },
  {
    id: "chat-ticket-5",
    title: "Ошибка оплаты картой",
    ticket_id: "ticket-5",
    ticket_status: getTicketStatus("ticket-5"),
    created_at: "2025-05-27T16:00:00Z",
    updated_at: "2025-05-27T17:30:00Z",
    last_message: "Отлично, закрываю обращение. Хорошего дня!",
  },
  {
    id: "chat-ticket-6",
    title: "Не читается история в тёмной теме",
    ticket_id: "ticket-6",
    ticket_status: getTicketStatus("ticket-6"),
    created_at: "2025-05-31T12:40:00Z",
    updated_at: "2025-06-02T09:01:00Z",
    last_message: "Обращение переоткрыто. Уточните, в каком разделе проблема заметнее всего?",
  },
]

export const MOCK_MESSAGE_DTOS: MessageDto[] = [
  {
    id: "msg-1-1",
    chat_id: "chat-ticket-1",
    role: "client",
    message: "После обновления приложения перестал печатать принтер, появляется ошибка драйвера.",
    created_at: "2025-05-28T10:00:00Z",
  },
  {
    id: "msg-1-2",
    chat_id: "chat-ticket-1",
    role: "ai",
    message: "Попробуйте переустановить драйвер принтера и перезапустить приложение.",
    created_at: "2025-05-28T10:01:00Z",
  },
  {
    id: "msg-1-3",
    chat_id: "chat-ticket-1",
    role: "client",
    message: "Переустановил, ошибка осталась.",
    created_at: "2025-05-28T10:10:00Z",
  },
  {
    id: "msg-1-4",
    chat_id: "chat-ticket-1",
    role: "ai",
    message: "Передаю обращение оператору, он подключится в ближайшее время.",
    created_at: "2025-05-28T10:11:00Z",
  },

  {
    id: "msg-2-1",
    chat_id: "chat-ticket-2",
    role: "client",
    message: "Веб-сервис постоянно теряет соединение, страницы не загружаются.",
    created_at: "2025-05-30T14:20:00Z",
  },
  {
    id: "msg-2-2",
    chat_id: "chat-ticket-2",
    role: "ai",
    message: "Перезагрузите роутер и напишите, вернулось ли соединение.",
    created_at: "2025-05-30T14:21:00Z",
  },

  {
    id: "msg-3-1",
    chat_id: "chat-ticket-3",
    role: "client",
    message: "После переноса данных на новый SSD пропали файлы в личном кабинете. Как их восстановить?",
    created_at: "2025-05-29T08:30:00Z",
  },
  {
    id: "msg-3-2",
    chat_id: "chat-ticket-3",
    role: "ai",
    message: "Откройте раздел «Файлы» и запустите восстановление из резервной копии.",
    created_at: "2025-05-29T08:31:00Z",
  },
  {
    id: "msg-3-3",
    chat_id: "chat-ticket-3",
    role: "client",
    message: "Спасибо, все файлы на месте!",
    created_at: "2025-05-29T11:44:00Z",
  },
  {
    id: "msg-3-4",
    chat_id: "chat-ticket-3",
    role: "ai",
    message: "Рад, что всё получилось! Закрываю обращение.",
    created_at: "2025-05-29T11:45:00Z",
  },

  {
    id: "msg-4-1",
    chat_id: "chat-ticket-4",
    role: "client",
    message: "Не могу подключиться к API через VPN, запросы завершаются ошибкой.",
    created_at: "2025-06-01T07:15:00Z",
  },
  {
    id: "msg-4-2",
    chat_id: "chat-ticket-4",
    role: "ai",
    message: "Похоже, нужна проверка доступа. Подключаю оператора.",
    created_at: "2025-06-01T07:16:00Z",
  },
  {
    id: "msg-4-3",
    chat_id: "chat-ticket-4",
    role: "admin",
    message: "Здравствуйте, я оператор. Проверяю настройки VPN на нашей стороне.",
    created_at: "2025-06-01T07:40:00Z",
  },

  {
    id: "msg-5-1",
    chat_id: "chat-ticket-5",
    role: "client",
    message: "Оплата картой не проходит, сервис выдаёт ошибку.",
    created_at: "2025-05-27T16:00:00Z",
  },
  {
    id: "msg-5-2",
    chat_id: "chat-ticket-5",
    role: "ai",
    message: "Проверьте срок действия карты и лимиты на онлайн-платежи, затем повторите оплату.",
    created_at: "2025-05-27T16:01:00Z",
  },
  {
    id: "msg-5-3",
    chat_id: "chat-ticket-5",
    role: "client",
    message: "Был исчерпан лимит, после его изменения оплата прошла.",
    created_at: "2025-05-27T17:29:00Z",
  },
  {
    id: "msg-5-4",
    chat_id: "chat-ticket-5",
    role: "ai",
    message: "Отлично, закрываю обращение. Хорошего дня!",
    created_at: "2025-05-27T17:30:00Z",
  },

  {
    id: "msg-6-1",
    chat_id: "chat-ticket-6",
    role: "client",
    message: "В аналитическом модуле в тёмной теме не читается история: текст сливается с фоном.",
    created_at: "2025-05-31T12:40:00Z",
  },
  {
    id: "msg-6-2",
    chat_id: "chat-ticket-6",
    role: "ai",
    message: "Переключите тему интерфейса и обновите страницу, это должно помочь.",
    created_at: "2025-05-31T12:41:00Z",
  },
  {
    id: "msg-6-3",
    chat_id: "chat-ticket-6",
    role: "client",
    message: "Сначала помогло, но проблема вернулась.",
    created_at: "2025-06-02T09:00:00Z",
  },
  {
    id: "msg-6-4",
    chat_id: "chat-ticket-6",
    role: "ai",
    message: "Обращение переоткрыто. Уточните, в каком разделе проблема заметнее всего?",
    created_at: "2025-06-02T09:01:00Z",
  },
]
