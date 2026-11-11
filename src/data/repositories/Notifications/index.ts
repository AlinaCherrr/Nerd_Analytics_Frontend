import { IS_MOCK } from "shared/utils"
import { notificationsMockRepository } from "./mockRepository"
import { notificationsRealRepository } from "./realRepository"
import type { NotificationsRepository } from "./types"

export const notificationsRepository: NotificationsRepository = IS_MOCK
  ? notificationsMockRepository
  : notificationsRealRepository

export type { Notification, NotificationType, NotificationsRepository } from "./types"
