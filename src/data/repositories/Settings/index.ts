import { settingsSource } from "data/sources/Settings"
import type { SettingsRepository } from "./types"

export const settingsRepository: SettingsRepository = {
  changePassword: async (req) => {
    await settingsSource.changePassword({
      current_password: req.currentPassword,
      new_password: req.newPassword,
    })
  },
}

export type { ChangePasswordRequest, SettingsRepository } from "./types"
